<script setup>
defineProps({
  click: Function,
})
</script>
<template>
  <button @click="click" type="button">
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  height: 40px;
  width: 128px;
  border: none;
  border-radius: 20px;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  position: relative;
  cursor: pointer;
}

button::before {
  content: '';
  top: 0;
  left: 0;
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 20px;
  pointer-events: none;
}

button:hover::before {
  background-color: var(--md-primary-hover);
}

button:active::before {
  background-color: var(--md-primary-active);
}
</style>
