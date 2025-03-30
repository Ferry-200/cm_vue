<script setup>
import GenericList from '@/component/GenericList.vue'
import { getAlbums } from '@/jellyfin/browsing'
import { getImageStreamUrl } from '@/jellyfin/stream'
import imageOff from '@/assets/image-off.svg'
import ImgWithFallback from '@/component/ImgWithFallback.vue'
</script>

<template>
  <GenericList
    :fetcher="getAlbums"
    per-page="50"
    :use-grid="true"
    grid-item-width="112"
    grid-gap="8"
  >
    <template v-slot="{ item }">
      <RouterLink :key="item.Id" class="album-item">
        <ImgWithFallback
          class="album-img"
          :src="getImageStreamUrl(item.Id, 96)"
          :fallback="imageOff"
        />
        <span>{{ item.Name }}</span>
      </RouterLink>
    </template>
  </GenericList>
</template>
<style scoped>
.album-item {
  display: flex;
  flex-direction: column;
  color: var(--md-on-surface);
  text-decoration: none;
  align-items: center;
  padding: 8px;
  position: relative;
}

.album-item::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 8px;
  pointer-events: none;
}

.album-item:hover::before {
  background-color: var(--md-surface-hover);
}

.album-item:active::before {
  background-color: var(--md-surface-active);
}

.album-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
