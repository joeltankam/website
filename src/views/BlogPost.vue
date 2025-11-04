<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-10 transition-all duration-300">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link 
            to="/blog" 
            class="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
            <h2 class="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
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
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
        <div class="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-pulse mx-auto"></div>
      </div>
      <p class="text-blue-600 mt-6 text-lg font-medium">Loading article...</p>
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
        class="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-blue-100"
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
              <p class="text-sm text-blue-600 font-medium">{{ calculateReadTime(post.html) }} min read</p>
            </div>
            
            <h1 
              class="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight"
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
                class="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-200"
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
            class="prose prose-lg prose-blue max-w-none prose-headings:text-gray-800 prose-headings:mb-3 prose-p:text-gray-700 prose-p:leading-normal prose-p:mb-3 prose-a:text-blue-600 prose-strong:text-gray-800 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white prose-pre:overflow-x-auto prose-pre:my-4"
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
          description="Subscribe to get notified when I publish new content on software engineering, web development, and technology."
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
    name: 'Facebook',
    key: 'facebook',
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  },
  {
    name: 'LinkedIn',
    key: 'linkedin',
    bgColor: 'bg-blue-700 hover:bg-blue-800',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
  },
  {
    name: 'Reddit',
    key: 'reddit',
    bgColor: 'bg-orange-500 hover:bg-orange-600',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>'
  },
  {
    name: 'WhatsApp',
    key: 'whatsapp',
    bgColor: 'bg-green-500 hover:bg-green-600',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>'
  },
  {
    name: 'Telegram',
    key: 'telegram',
    bgColor: 'bg-blue-400 hover:bg-blue-500',
    icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
  }
]

const loadPost = async () => {
  loading.value = true
  try {
    console.log('Loading post:', props.slug)
    post.value = await getPostBySlug(props.slug)
    console.log('Loaded post:', post.value)
    
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
  background: #1f2937 !important;
}
</style>
