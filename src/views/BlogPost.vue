<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
    <!-- Navigation Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-primary-100 sticky top-0 z-10 transition-all duration-300">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link 
            to="/blog" 
            class="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Blog</span>
          </router-link>
          
          <!-- Dynamic content that appears when scrolled -->
          <div 
            v-if="post && isScrolled"
            class="text-right flex-1 mx-4 overflow-hidden transition-all duration-300"
          >
            <h2 class="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent truncate">
              {{ post.frontmatter.title }}
            </h2>
            <p class="text-sm text-gray-500">{{ formatDate(post.frontmatter.date) }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-6 py-20 text-center">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
        <div class="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-primary-400 animate-pulse mx-auto"></div>
      </div>
      <p class="text-primary-600 mt-6 text-lg font-medium">Loading article...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="!post" class="max-w-4xl mx-auto px-6 py-20 text-center">
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-red-200 shadow-lg">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p class="text-gray-600 max-w-md mx-auto">
          The requested blog post could not be found. It may have been moved or deleted.
        </p>
      </div>
    </div>

    <!-- Post Content -->
    <main v-else class="max-w-5xl mx-auto px-6 py-12">
      <!-- Breadcrumb -->
      <Breadcrumb 
        v-if="post"
        :items="breadcrumbItems"
        class="mb-6"
      />
      
      <article 
        class="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-primary-100"
        itemscope 
        itemtype="https://schema.org/BlogPosting"
      >
        <!-- Post Header -->
        <div class="px-8 pt-8 pb-4 lg:px-12 lg:pt-12 lg:pb-6 border-b border-gray-200">
          <div class="mb-6">
            <div class="flex items-center space-x-3 mb-6">
              <p class="text-sm text-gray-600">
                <time :datetime="post.frontmatter.date" itemprop="datePublished">
                  {{ formatDate(post.frontmatter.date) }}
                </time>
              </p>
              <span class="text-gray-400">•</span>
              <p class="text-sm text-primary-600 font-medium">{{ calculateReadTime(post.html) }} min read</p>
            </div>
            
            <h1 
              class="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight"
              itemprop="headline"
            >
              {{ post.frontmatter.title }}
            </h1>
            <p 
              class="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed"
              itemprop="description"
            >
              {{ post.frontmatter.excerpt }}
            </p>
            
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="tag in post.frontmatter.tags" 
                :key="tag"
                class="px-4 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-full border border-primary-200"
                itemprop="keywords"
              >
                # {{ tag }}
              </span>
            </div>
            
            <!-- Hidden metadata for SEO -->
            <meta itemprop="author" :content="siteConfig.author">
            <meta itemprop="dateModified" :content="post.frontmatter.date">
            <link itemprop="mainEntityOfPage" :href="currentUrl">
          </div>
        </div>

        <!-- Post Content -->
        <div class="px-8 pt-4 pb-8 lg:px-12 lg:pt-6 lg:pb-12">
          <div 
            ref="contentRef"
            class="prose prose-lg prose-primary max-w-none prose-headings:text-gray-800 prose-headings:mb-3 prose-p:text-gray-700 prose-p:leading-normal prose-p:mb-3 prose-a:text-primary-600 prose-strong:text-gray-800 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white prose-pre:overflow-x-auto prose-pre:my-4"
            v-html="post.html"
            itemprop="articleBody"
          ></div>
        </div>

        <!-- Social Media Sharing -->
        <div class="px-8 lg:px-12 pb-8 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">Share this article:</p>
            
            <div class="flex gap-2">
              <button
                v-for="platform in socialPlatforms"
                :key="platform.name"
                @click="sharePost(platform.key)"
                :title="`Share on ${platform.name}`"
                class="p-2 rounded-lg text-white hover:scale-110 transform transition-all duration-200"
                :class="platform.bgColor"
              >
                <div class="w-4 h-4 flex items-center justify-center">
                  <span v-html="platform.icon"></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="px-8 lg:px-12 pb-8">
          <Comments theme="light" />
        </div>
      </article>

      <!-- Newsletter Signup -->
      <div class="mt-12">
        <Newsletter 
          title="Enjoyed this article?"
          description="Subscribe to get notified when I publish new posts."
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug, generateShareUrl, type BlogPost } from '../utils/blog'
import { useSeo } from '../composables/useSeo'
import { getOGImage } from '../utils/ogImage'
import { siteConfig } from '../../site.config.ts'
import Breadcrumb from '../components/Breadcrumb.vue'
import Comments from '../components/Comments.vue'
import Newsletter from '../components/Newsletter.vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import 'highlight.js/styles/github-dark.css'
import mermaid from 'mermaid'

// Initialize Mermaid with custom theme matching website colors
mermaid.initialize({ 
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3b82f6',        // primary-500 (blue)
    primaryTextColor: '#fff',
    primaryBorderColor: '#2563eb',  // primary-600
    lineColor: '#60a5fa',           // primary-400
    secondaryColor: '#6366f1',      // secondary-500 (indigo)
    tertiaryColor: '#dbeafe',       // primary-100
    background: '#ffffff',
    mainBkg: '#eff6ff',             // primary-50
    secondBkg: '#eef2ff',           // secondary-50
    textColor: '#1f2937',           // gray-800
    border1: '#bfdbfe',             // primary-200
    border2: '#c7d2fe',             // secondary-200
    note: '#eff6ff',
    noteBkgColor: '#dbeafe',
    noteTextColor: '#1e40af',       // primary-800
    noteBorderColor: '#2563eb',     // primary-600
    arrowheadColor: '#2563eb',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '18px'
  },
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'monotoneY',
    padding: 20
  }
})

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('xml', html)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
// Add common aliases
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('vue', html) // Use html for vue files
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('shell', bash)

interface Props {
  slug: string
}

const props = defineProps<Props>()

const route = useRoute()
const post = ref<BlogPost | null>(null)
const loading = ref(true)
const contentRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

// Computed current URL
const currentUrl = computed(() => {
  const baseUrl = window.location.origin
  return `${baseUrl}${route.fullPath}`
})

// SEO meta tags
const seoMeta = computed(() => {
  if (!post.value) return null
  
  return {
    title: `${post.value.frontmatter.title} | ${siteConfig.author}`,
    description: post.value.frontmatter.excerpt,
    keywords: post.value.frontmatter.tags,
    author: siteConfig.author,
    url: currentUrl.value,
    image: getOGImage('post', post.value),
    type: 'article' as const,
    publishedTime: new Date(post.value.frontmatter.date).toISOString(),
    tags: post.value.frontmatter.tags,
    section: 'Technology'
  }
})

// Apply SEO
const { addStructuredData } = useSeo(seoMeta)

// Breadcrumb navigation
const breadcrumbItems = computed(() => {
  if (!post.value) return []
  
  return [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.value.frontmatter.title, to: route.fullPath, active: true }
  ]
})

// Scroll detection
const handleScroll = () => {
  // Show banner content when scrolled down more than 200px
  isScrolled.value = window.scrollY > 200
}

const socialPlatforms = [
  {
    name: 'X',
    key: 'twitter',
    bgColor: 'bg-black hover:bg-gray-800',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  },
  {
    name: 'Bluesky',
    key: 'bluesky',
    bgColor: 'bg-blue-500 hover:bg-blue-600',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>'
  },
  {
    name: 'LinkedIn',
    key: 'linkedin',
    bgColor: 'bg-primary-700 hover:bg-primary-800',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
  }
]

const loadPost = async () => {
  loading.value = true
  try {
    post.value = await getPostBySlug(props.slug)
    
    // Add structured data for SEO
    if (post.value) {
      const baseUrl = window.location.origin
      
      addStructuredData({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.frontmatter.title,
        description: post.value.frontmatter.excerpt,
        author: {
          '@type': 'Person',
          name: siteConfig.author,
          url: baseUrl,
          sameAs: [
            `https://github.com/${siteConfig.social.github}`,
            `https://x.com/${siteConfig.social.twitter}`,
            `https://linkedin.com/in/${siteConfig.social.linkedin}`
          ]
        },
        datePublished: new Date(post.value.frontmatter.date).toISOString(),
        dateModified: new Date(post.value.frontmatter.date).toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': currentUrl.value
        },
        publisher: {
          '@type': 'Person',
          name: siteConfig.author,
          url: baseUrl
        },
        keywords: post.value.frontmatter.tags.join(', '),
        articleSection: 'Technology',
        wordCount: post.value.html.replace(/<[^>]*>/g, '').split(/\s+/).length,
        articleBody: post.value.html.replace(/<[^>]*>/g, '').substring(0, 500)
      })
    }
  } catch (error) {
    console.error('Error loading post:', error)
    post.value = null
  } finally {
    loading.value = false
  }
}

const applyHighlighting = () => {
  if (!contentRef.value) return
  
  contentRef.value.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block as HTMLElement)
  })
}

const renderMermaidDiagrams = async () => {
  if (!contentRef.value) return
  
  const mermaidBlocks = contentRef.value.querySelectorAll('pre code.language-mermaid')
  
  for (let i = 0; i < mermaidBlocks.length; i++) {
    const block = mermaidBlocks[i]
    const pre = block.parentElement
    if (!pre) continue
    
    const code = block.textContent || ''
    const id = `mermaid-${Date.now()}-${i}`
    
    const container = document.createElement('div')
    container.className = 'mermaid-container my-8 w-full'
    container.innerHTML = `<div id="${id}" class="mermaid">${code}</div>`
    
    pre.replaceWith(container)
  }
  
  // Render all mermaid diagrams
  if (mermaidBlocks.length > 0) {
    try {
      await mermaid.run({
        querySelector: '.mermaid'
      })
    } catch (error) {
      console.error('Mermaid rendering error:', error)
    }
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const calculateReadTime = (html: string): number => {
  const wordsPerMinute = 200
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

const sharePost = (platform: string) => {
  if (!post.value) return
  
  const shareUrl = generateShareUrl(platform, post.value)
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

onMounted(() => {
  loadPost()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
watch(() => props.slug, loadPost)

// Watch for post changes and apply highlighting
watch(post, async () => {
  if (post.value) {
    await nextTick()
    applyHighlighting()
    await renderMermaidDiagrams()
  }
})
</script>

<style scoped>
/* Override prose styles for code blocks */
.prose :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent;
}

.prose :deep(pre code) {
  display: block;
  margin: 1.5em 0;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: var(--color-gray-800) !important;
}

/* Mermaid diagram container */
.mermaid-container {
  width: 100%;
  overflow-x: auto;
}

.mermaid-container :deep(.mermaid) {
  background: transparent;
  display: flex;
  justify-content: center;
  width: 100%;
}

.mermaid-container :deep(svg) {
  max-width: 100%;
  width: 100%;
  height: auto;
}

/* Mermaid styling - rounded corners and bold text */
.mermaid-container :deep(.node rect),
.mermaid-container :deep(.node circle),
.mermaid-container :deep(.node ellipse),
.mermaid-container :deep(.node polygon) {
  rx: 8px;
  ry: 8px;
}

.mermaid-container :deep(.nodeLabel),
.mermaid-container :deep(.edgeLabel) {
  font-weight: 600;
  font-size: 16px;
}

.mermaid-container :deep(.label) {
  font-weight: 600;
}
</style>

