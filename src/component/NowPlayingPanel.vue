<script setup>
import { useNowPlayingId, usePlayerState } from '@/composables'
import { getSongInfo } from '@/jellyfin/browsing'
import { getImageStreamUrl } from '@/jellyfin/stream'
import { computed, shallowRef, watchEffect } from 'vue'
import MDFilledIconButton from './MDFilledIconButton.vue'
import { Pause, Play, SkipForward, SkipBack } from 'lucide-vue-next'
import { player } from '@/audio_player'
import MDFilledTonalIconButton from './MDFilledTonalIconButton.vue'
import imageOff from '@/assets/image-off.svg'
import ImgWithFallback from '@/component/ImgWithFallback.vue'

const nowPlayingId = useNowPlayingId()
const nowPlaying = shallowRef({
  title: 'Coriander Music',
  artists: '',
  album: '',
  albumId: '',
})

watchEffect((onCleanup) => {
  if (!nowPlayingId.value) return

  let outdated = false
  onCleanup(() => {
    outdated = true
  })

  getSongInfo(nowPlayingId.value).then((val) => {
    if (!outdated) {
      let newTitle = val.Name || ''
      let newArtists = val.Artists || []
      let newAlbum = val.Album || ''
      let newAlbumId = val.AlbumId || ''

      nowPlaying.value = {
        title: newTitle,
        artists: newArtists.join(' | '),
        album: newAlbum,
        albumId: newAlbumId,
      }
    }
  })
})

const nowPlayingImgUrl = computed(() => getImageStreamUrl(nowPlaying.value.albumId, 252))
const isPaused = usePlayerState()
</script>
<template>
  <div class="now-playing-panel">
    <span>{{ nowPlaying.title }}</span>
    <span>{{ nowPlaying.artists }}</span>
    <span>{{ nowPlaying.album }}</span>
    <ImgWithFallback :src="nowPlayingImgUrl" :fallback="imageOff" class="now-playing-img" />
    <div class="action-row">
      <MDFilledTonalIconButton :click="player.playPrev">
        <SkipBack />
      </MDFilledTonalIconButton>
      <MDFilledIconButton :click="player.toggle">
        <Play v-if="isPaused" />
        <Pause v-else />
      </MDFilledIconButton>
      <MDFilledTonalIconButton :click="player.playNext">
        <SkipForward />
      </MDFilledTonalIconButton>
    </div>
  </div>
</template>
<style scoped>
.now-playing-panel {
  width: 276px;
  padding: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--md-primary-container);
  border-radius: 12px;
  margin-top: auto;
  margin-bottom: 12px;
  color: var(--md-on-primary-container);
}

span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 14px;
}

.now-playing-img {
  width: 252px;
  height: 252px;
  border-radius: 8px;
  margin: 8px 0;
}

.action-row {
  display: flex;
  gap: 8px;
}
</style>
