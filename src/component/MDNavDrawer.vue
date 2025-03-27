<script setup>
defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}

import MDNavDrawerDes from './MDNavDrawerDes.vue'
import { Music, Users, DiscAlbum } from 'lucide-vue-next'

const routes = [
  { path: '/', name: '音乐', icon: Music },
  { path: '/artist', name: '艺术家', icon: Users },
  { path: '/album', name: '专辑', icon: DiscAlbum },
]
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="scrim" v-show="isOpen" @click="emitClose"></div>
    </Transition>

    <Transition name="slide">
      <nav v-show="isOpen">
        <div class="nav-header">Coriander Music</div>
        <template v-for="item of routes" :key="item.path">
          <MDNavDrawerDes
            :click="emitClose"
            class="des-item"
            :is-active="$route.path === item.path"
            :to="item.path"
          >
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #default>{{ item.name }}</template>
          </MDNavDrawerDes>
        </template>
      </nav>
    </Transition>
  </Teleport>
</template>
<style scoped>
.scrim {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--md-scrim);
}

nav {
  position: fixed;
  height: 100vh;
  width: 300px;
  top: 0;
  left: 0;
  border-radius: 0 12px 12px 0;
  background-color: var(--md-surface);
  padding: 0 12px;
}

.nav-header {
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 14px;
}

/* 遮罩的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 抽屉的滑入滑出动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 300ms ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
