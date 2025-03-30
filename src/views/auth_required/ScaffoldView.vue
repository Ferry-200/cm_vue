<script setup>
import MDNavDrawer from '@/component/MDNavDrawer.vue'
import MDStanderIconButton from '@/component/MDStanderIconButton.vue'
import { Menu, Search } from 'lucide-vue-next'
import { ref } from 'vue'

const isOpen = ref(false)
function closeDrawer() {
  isOpen.value = false
}
function toggleDrawer() {
  isOpen.value = !isOpen.value
}

const routesName = {
  '/': '音乐',
  '/artist': '艺术家',
  '/album': '专辑',
  '/artist/detail': '详情',
  '/album/detail': '详情',
}
</script>
<template>
  <header class="top-app-bar">
    <MDStanderIconButton :click="toggleDrawer">
      <Menu />
    </MDStanderIconButton>
    <span class="headline">{{ routesName[$route.path] }}</span>
    <MDStanderIconButton><Search /></MDStanderIconButton>
  </header>
  <MDNavDrawer :is-open="isOpen" @close="closeDrawer" />
  <main class="app-view">
    <RouterView />
  </main>
</template>
<style scoped>
.top-app-bar {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}

.headline {
  font-size: 22px;
}

.app-view {
  height: calc(100vh - 48px);
  width: calc(100vw - 16px);
  margin: 0 8px;
}
</style>
