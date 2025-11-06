<template>
  <nav v-if="totalPages > 1" aria-label="Pagination" class="flex items-center justify-center space-x-2 mt-8">
    <!-- Previous Page -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-all',
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-primary-600 hover:bg-primary-50 border border-primary-200 shadow-sm'
      ]"
    >
      ← Previous
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center space-x-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'w-10 h-10 rounded-lg font-medium transition-all',
          page === currentPage
            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Page -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-all',
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-primary-600 hover:bg-primary-50 border border-primary-200 shadow-sm'
      ]"
    >
      Next →
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits<Emits>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const halfVisible = Math.floor(props.maxVisiblePages / 2)
  
  let startPage = Math.max(1, props.currentPage - halfVisible)
  let endPage = Math.min(props.totalPages, startPage + props.maxVisiblePages - 1)
  
  // Adjust start if we're near the end
  if (endPage - startPage + 1 < props.maxVisiblePages) {
    startPage = Math.max(1, endPage - props.maxVisiblePages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>


