<script setup>
import MDScrollArea from '@/component/MDScrollArea.vue'
import { getSongs } from '@/jellyfin/browsing'
import { useAsyncState } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
import MDPagingArea from '@/component/MDPagingArea.vue'
import { audioPlayer } from '@/audio_player'
import { getAudioImageStreamUrl, getAudioStreamUrl } from '@/jellyfin/stream'

const pageIndex = ref(0)
const pageCount = ref(0)

const { state, isReady, execute } = useAsyncState(
  (args) => {
    let _args = args || [0, 50]
    return getSongs(..._args)
  },
  {},
  {
    resetOnExecute: false,
  },
)

watchEffect(() => {
  if (isReady.value) {
    pageCount.value = Math.floor(state.value['data']['TotalRecordCount'] / 50)
  }
})

function loadPage(index) {
  pageIndex.value = index
  execute(0, [pageIndex.value * 50, 50])
}

function playAudio(aid) {
  audioPlayer.setSourceUrl(getAudioStreamUrl(aid))
  audioPlayer.play()
}
</script>
<template>
  <MDScrollArea v-if="isReady">
    <div
      v-for="music of state['data']['Items']"
      :key="music['Id']"
      @click="playAudio(music['Id'])"
      class="music-tile"
    >
      <img :src="getAudioImageStreamUrl(music['AlbumId'], 56)" />
      <div class="music-tile-info">
        <span>{{ music['Name'] }}</span>
        <div class="music-tile-artists">
          <span class="music-tile-chip" v-for="artist of music['Artists']" :key="artist">
            {{ artist }}
          </span>
        </div>
        <div style="display: flex">
          <span class="music-tile-chip music-tile-album">{{ music['Album'] }}</span>
        </div>
      </div>
    </div>
    <MDPagingArea
      style="margin: 8px"
      :curr-page="pageIndex"
      :page-count="pageCount"
      @page-selected="loadPage"
    />
  </MDScrollArea>
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
