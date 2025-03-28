<script setup>
import GenericList from '@/component/GenericList.vue'
import { getArtists } from '@/jellyfin/browsing'
import { getImageStreamUrl } from '@/jellyfin/stream'
</script>

<template>
  <GenericList
    :fetcher="getArtists"
    per-page="50"
    :use-grid="true"
    grid-item-width="112"
    grid-gap="8"
  >
    <template v-slot="{ item }">
      <RouterLink :key="item.Id" class="artist-item">
        <img :src="getImageStreamUrl(item.Id, 96)" />
        <span>{{ item.Name }}</span>
      </RouterLink>
    </template>
  </GenericList>
</template>
<style scoped>
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

img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
