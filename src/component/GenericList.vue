<script setup>
const { fetcher, perPage, useGrid, gridItemWidth, gridGap } = defineProps({
  fetcher: Function,
  perPage: Number,
  useGrid: Boolean,
  gridItemWidth: Number,
  gridGap: Number,
})
import MDScrollArea from '@/component/MDScrollArea.vue'
import { useAsyncState } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
import MDPagingArea from '@/component/MDPagingArea.vue'

const pageIndex = ref(0)
const pageCount = ref(0)

const { state, isReady, execute } = useAsyncState(
  (args) => {
    let _args = args || [0, perPage]
    return fetcher(..._args)
  },
  {},
  {
    resetOnExecute: false,
  },
)

watchEffect(() => {
  if (isReady.value) {
    pageCount.value = Math.floor(state.value['TotalRecordCount'] / 50)
  }
})

function loadPage(index) {
  pageIndex.value = index
  execute(0, [pageIndex.value * 50, 50])
}
</script>
<template>
  <MDScrollArea v-if="isReady">
    <template v-if="useGrid">
      <div
        class="grid-view"
        :style="{
          gridTemplateColumns: `repeat(auto-fill, minmax(${gridItemWidth}px, 1fr))`,
          gap: `${gridGap}px`,
        }"
      >
        <slot
          v-for="(item, index) of state['Items']"
          :item="item"
          :index="index"
          :arr="state['Items']"
        ></slot>
      </div>
    </template>
    <template v-else>
      <slot
        v-for="(item, index) of state['Items']"
        :item="item"
        :index="index"
        :arr="state['Items']"
      ></slot>
    </template>

    <MDPagingArea
      style="margin: 8px"
      :curr-page="pageIndex"
      :page-count="pageCount"
      @page-selected="loadPage"
    />
  </MDScrollArea>
</template>
<style scoped>
.grid-view {
  display: grid;
}
</style>
