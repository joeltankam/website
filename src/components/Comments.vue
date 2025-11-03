<template>
  <div class="comments-section">
    <div class="border-t border-gray-200 pt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        Comments
      </h2>
      
      <!-- Giscus Comments Container -->
      <div ref="commentsContainer" class="giscus-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  theme?: 'light' | 'dark' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const route = useRoute()
const commentsContainer = ref<HTMLElement | null>(null)

const loadGiscus = () => {
  if (!commentsContainer.value) return

  // Clear existing comments
  commentsContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'joeltankam/joeltankam.github.io') // Replace with your repo
  script.setAttribute('data-repo-id', 'YOUR_REPO_ID') // Replace with your repo ID
  script.setAttribute('data-category', 'Blog Comments') // Replace with your category
  script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID') // Replace with your category ID
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', props.theme === 'dark' ? 'dark' : 'light')
  script.setAttribute('data-lang', 'en')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  commentsContainer.value.appendChild(script)
}

onMounted(() => {
  // Load comments after a short delay to improve page load performance
  setTimeout(loadGiscus, 500)
})

// Reload comments when route changes
watch(() => route.path, () => {
  loadGiscus()
})
</script>

<style scoped>
.giscus-container {
  min-height: 200px;
}

.giscus-container :deep(.giscus) {
  width: 100%;
}
</style>
