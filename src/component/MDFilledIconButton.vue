<script setup>
defineProps({
  click: Function,
})
</script>
<template>
  <button type="button" @click="click">
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
}

button::before {
  content: '';
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  pointer-events: none;
}

button:hover::before {
  background-color: var(--md-primary-hover);
}

button:active::before {
  background-color: var(--md-primary-active);
}
</style>
