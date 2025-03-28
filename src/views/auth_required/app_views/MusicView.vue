<script setup>
import { getSongs } from '@/jellyfin/browsing'
import { getAudioImageStreamUrl } from '@/jellyfin/stream'
import { player } from '@/audio_player'
import GenericList from '@/component/GenericList.vue'

function play(index, playlist) {
  player.setPlaylist(
    playlist.map((item) => item.Id),
    index,
  )
  player.play()
}
</script>
<template>
  <GenericList :fetcher="getSongs" per-page="50">
    <template v-slot="{ item, index, arr }">
      <div :key="item.Id" @click="play(index, arr)" class="music-tile">
        <img :src="getAudioImageStreamUrl(item.AlbumId, 56)" />
        <div class="music-tile-info">
          <span>{{ item.Name }}</span>
          <div class="music-tile-artists">
            <span class="music-tile-chip" v-for="artist of item.Artists" :key="artist">
              {{ artist }}
            </span>
          </div>
          <div style="display: flex">
            <span class="music-tile-chip music-tile-album">{{ item.Album }}</span>
          </div>
        </div>
      </div>
    </template>
  </GenericList>
</template>
<style scoped>
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
  width: inherit;
  height: inherit;
  border-radius: 8px;
  pointer-events: none;
}

.music-tile:hover::before {
  background-color: var(--md-surface-hover);
}

.music-tile:active::before {
  background-color: var(--md-surface-active);
}

img {
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
