<script setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
</script>
<template>
  <OverlayScrollbarsComponent
    element="div"
    class="md-scroll-area"
    :options="{
      scrollbars: {
        theme: 'md-scrollbar',
        autoHide: 'move',
        autoHideDelay: 300,
      },
    }"
    defer
  >
    <slot></slot>
  </OverlayScrollbarsComponent>
</template>
<style>
.md-scroll-area {
  height: inherit;
}

.md-scrollbar {
  box-sizing: border-box;
  --os-size: 6px;
  --os-padding-axis: 2px;
  --os-track-border-radius: 3px;
  --os-handle-border-radius: 3px;
  --os-track-bg: var(--md-outline-variant);
  --os-track-bg-hover: var(--md-outline-variant);
  --os-track-bg-active: var(--md-outline-variant);
  --os-handle-bg: var(--md-outline);
  --os-handle-bg-hover: var(--md-outline);
  --os-handle-bg-active: var(--md-outline);
}
</style>
