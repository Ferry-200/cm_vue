<script setup>
let { currPage, pageCount, onPageSelected } = defineProps({
  currPage: Number,
  pageCount: Number,
  onPageSelected: Function,
})
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'

function prevPage() {
  if (currPage > 0) {
    onPageSelected(currPage - 1)
  }
}

function nextPage() {
  if (currPage < pageCount) {
    onPageSelected(currPage + 1)
  }
}

function selectPage(index) {
  if (index >= 0 && index <= pageCount && index !== currPage) {
    onPageSelected(index)
  }
}

let prevDisabled = currPage <= 0
let nextDisabled = currPage >= pageCount
</script>
<template>
  <div class="paging-area">
    <button
      @click="prevPage"
      class="paging-btn side-paging-btn"
      :class="{ 'disabled-paging-btn': prevDisabled }"
      type="button"
    >
      <ArrowLeft />
    </button>
    <template v-if="pageCount >= 2">
      <button
        v-for="index of pageCount + 1"
        v-bind:key="index"
        @click="selectPage(index - 1)"
        class="paging-btn"
        :class="{ 'curr-paging-btn': currPage === index - 1 }"
        type="button"
      >
        {{ index }}
      </button>
    </template>
    <button
      @click="nextPage"
      class="paging-btn side-paging-btn"
      :class="{ 'disabled-paging-btn': nextDisabled }"
      type="button"
    >
      <ArrowRight />
    </button>
  </div>
</template>
<style scoped>
.paging-area {
  float: right;
  display: flex;
}

.paging-btn {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--md-surface);
  border: none;
  color: var(--md-on-surface);
  border-radius: 8px;
  margin-left: 4px;
  position: relative;
  cursor: pointer;
}

.paging-btn::before {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  width: inherit;
  height: inherit;
  content: '';
}

.paging-btn:hover:before {
  background-color: var(--md-surface-hover);
}

.paging-btn:active:before {
  background-color: var(--md-surface-active);
}

.side-paging-btn {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
}

.side-paging-btn:hover:before {
  background-color: var(--md-primary-hover);
}

.side-paging-btn:active:before {
  background-color: var(--md-primary-active);
}

.curr-paging-btn {
  background-color: var(--md-secondary);
  color: var(--md-on-secondary);
}

.curr-paging-btn:hover:before {
  background-color: var(--md-secondary-hover);
}

.curr-paging-btn:active:before {
  background-color: var(--md-secondary-active);
}

.disabled-paging-btn {
  opacity: 0.32;
  cursor: not-allowed;
}

.disabled-paging-btn:hover:before,
.disabled-paging-btn:active:before {
  background-color: initial;
}
</style>
