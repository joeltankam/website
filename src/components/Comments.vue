<template>
  <div class="comments-section">
    <div class="border-t border-gray-200 pt-8">
      <!-- Giscus Comments Container -->
      <div ref="commentsContainer" class="giscus-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../../site.config'

interface Props {
  theme?: 'light' | 'dark' | 'auto' | 'custom'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const route = useRoute()
const commentsContainer = ref<HTMLElement | null>(null)

const getTheme = () => {
  // Use custom CSS theme if theme is set to 'custom'
  if (props.theme === 'custom') {
    // In development, use 'light' theme to avoid CORS issues
    // In production, use custom CSS theme from your domain
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1'
    
    if (isLocalhost) {
      return 'light'
    }
    
    return `${window.location.origin}/giscus-theme.css`
  }
  
  // Otherwise use the built-in Giscus themes
  return props.theme
}

const loadGiscus = () => {
  if (!commentsContainer.value) return

  // Clear existing comments
  commentsContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', `${siteConfig.social.github}/website`)
  script.setAttribute('data-repo-id', 'R_kgDOQQzxyQ')
  script.setAttribute('data-category', 'Blog Comments')
  script.setAttribute('data-category-id', 'DIC_kwDOQQzxyc4Cxmns')
  script.setAttribute('data-mapping', 'title')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', getTheme())
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

