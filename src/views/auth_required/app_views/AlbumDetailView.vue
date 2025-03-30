<script setup>
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { getAlbumInfo, getAlbumSongs } from '@/jellyfin/browsing'
import MDScrollArea from '@/component/MDScrollArea.vue'
import ImgWithFallback from '@/component/ImgWithFallback.vue'
import { getImageStreamUrl } from '@/jellyfin/stream'
import imageOff from '@/assets/image-off.svg'
import { player } from '@/audio_player'

const route = useRoute()
const id = route.query['id']
const info = useAsyncState(() => getAlbumInfo(id), {}, { resetOnExecute: false })

const songs = useAsyncState(
  () => getAlbumSongs(id),
  {},
  {
    resetOnExecute: false,
  },
)

function play(index, list) {
  player.setPlaylist(
    list.map((item) => item.Id),
    index,
  )
  player.play()
}
</script>
<template>
  <MDScrollArea v-if="info.isReady.value && songs.isReady.value">
    <div class="album-detail-main">
      <ImgWithFallback class="detail-img" :src="getImageStreamUrl(id, 240)" :fallback="imageOff" />
      <span class="album-detail-title">{{ info.state.value.Name }}</span>
      <span
        >{{ info.state.value.Artists.length }} 位艺术家，{{
          info.state.value.ChildCount
        }}
        首作品</span
      >
      <section>
        <span class="album-detail-subtitle">艺术家</span>
        <div class="album-detail-artists">
          <RouterLink
            v-for="artist of info.state.value.ArtistItems"
            :key="artist.Id"
            class="artist-item"
            :to="{
              path: '/artist/detail',
              query: {
                id: artist.Id,
              },
            }"
          >
            <ImgWithFallback
              class="artist-img"
              :src="getImageStreamUrl(artist.Id, 96)"
              :fallback="imageOff"
            />
            <span>{{ artist.Name }}</span>
          </RouterLink>
        </div>
      </section>
      <section>
        <span class="album-detail-subtitle">作品</span>
        <div>
          <div
            v-for="(song, index) of songs.state.value"
            :key="song.Id"
            @click="play(index, songs.state.value)"
            class="music-tile"
          >
            <ImgWithFallback
              :src="getImageStreamUrl(song.AlbumId, 56)"
              :fallback="imageOff"
              class="music-tile-img"
            />
            <div class="music-tile-info">
              <span>{{ song.Name }}</span>
              <div class="music-tile-artists">
                <span class="music-tile-chip" v-for="artist of song.Artists" :key="artist">
                  {{ artist }}
                </span>
              </div>
              <div style="display: flex">
                <span class="music-tile-chip music-tile-album">{{ song.Album }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MDScrollArea>
</template>
<style scoped>
.album-detail-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 8px 0;
}

.detail-img {
  margin-bottom: 8px;
  width: 240px;
  border-radius: 16px;
}

.album-detail-title {
  font-size: 20px;
  font-weight: bold;
}

section {
  margin: 16px 0 0 0;
  align-self: stretch;
}

.album-detail-subtitle {
  font-size: 18px;
}

.album-detail-artists {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.artist-item {
  display: flex;
  flex-direction: column;
  color: var(--md-on-surface);
  text-decoration: none;
  align-items: center;
  padding: 8px;
  position: relative;
}

.artist-item::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 8px;
  pointer-events: none;
}

.artist-item:hover::before {
  background-color: var(--md-surface-hover);
}

.artist-item:active::before {
  background-color: var(--md-surface-active);
}

.artist-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.music-tile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  position: relative;
  line-height: 1;
  width: inherit;
  height: 74px;
}

.music-tile::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  pointer-events: none;
}

.music-tile:hover::before {
  background-color: var(--md-surface-hover);
}

.music-tile:active::before {
  background-color: var(--md-surface-active);
}

.music-tile-img {
  width: 56px;
  height: 56px;
  border-radius: 4px;
}

.music-tile-info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-tile-artists {
  display: flex;
  gap: 4px;
  margin: 4px 0;
}

.music-tile-chip {
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 0 4px;
  border-radius: 0.5rem;
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
}

.music-tile-album {
  background-color: var(--md-secondary-container);
  color: var(--md-on-secondary-container);
}
</style>
