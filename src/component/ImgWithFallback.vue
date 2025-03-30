<script setup>
const props = defineProps({
  src: String,
  fallback: String,
})
import { ref, watch } from 'vue'

const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

function onError() {
  hasError.value = true
}
</script>
<template>
  <img :key="src" @error="onError" :src="hasError ? fallback : src" />
</template>
