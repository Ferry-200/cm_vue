<script setup>
defineProps({
  to: String,
  isActive: Boolean,
  click: Function,
})
</script>
<template>
  <div @click="click">
    <RouterLink class="nav-des" :class="{ active: isActive }" :to="to">
      <slot name="icon"></slot>
      <span class="nav-des-name">
        <slot></slot>
      </span>
    </RouterLink>
  </div>
</template>
<style scoped>
.nav-des {
  display: flex;
  align-items: center;
  height: 48px;
  width: 276px;
  border-radius: 24px;
  color: var(--md-on-surface);
  text-decoration: none;
  padding: 0 16px;
  position: relative;
}

.nav-des::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 24px;
  pointer-events: none;
}

.nav-des:hover:before {
  background-color: var(--md-surface-hover);
}

.nav-des:active:before {
  background-color: var(--md-surface-active);
}

.nav-des-name {
  margin-left: 12px;
}

.active {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
}

.active:hover::before {
  background-color: var(--md-primary-hover);
}

.active:active::before {
  background-color: var(--md-primary-active);
}
</style>
