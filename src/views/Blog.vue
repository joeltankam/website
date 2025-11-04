<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link 
            to="/" 
            class="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Home</span>
          </router-link>
          
          <div class="text-right">
            <h2 class="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</h2>
            <p class="text-sm text-gray-500">{{ filteredPosts.length }} / {{ allPosts.length }} articles</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Blog Posts -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <!-- Breadcrumb -->
      <Breadcrumb 
        :items="breadcrumbItems"
        class="mb-6"
      />
      
      <div v-if="!loading && allPosts.length > 0" class="flex gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-80 flex-shrink-0 space-y-6 hidden lg:block">
          <!-- Search Bar -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                class="w-full pl-9 pr-8 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-400 outline-none transition-colors"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Tag Filters -->
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <h3 class="text-sm font-semibold text-gray-800">Filter by Tags</h3>
              </div>
              <button
                v-if="selectedTags.length > 0"
                @click="selectedTags = []"
                class="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear
              </button>
            </div>
            <div class="space-y-2">
              <button
                v-for="tag in allTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-sm'
                ]"
              >
                <span class="flex items-center">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full mr-2',
                      selectedTags.includes(tag) ? 'bg-white' : 'bg-blue-400'
                    ]"
                  ></span>
                  {{ tag }}
                </span>
                <span :class="selectedTags.includes(tag) ? 'text-white/80' : 'text-gray-500'">
                  {{ getTagCount(tag) }}
                </span>
              </button>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="searchQuery || selectedTags.length > 0" class="bg-blue-50/70 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-blue-900">Active Filters</span>
              <button
                @click="clearFilters"
                class="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div class="space-y-2">
              <div v-if="searchQuery" class="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2 text-xs">
                <span class="text-gray-700 truncate flex-1">{{ searchQuery }}</span>
                <button @click="searchQuery = ''" class="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div
                v-for="tag in selectedTags"
                :key="tag"
                class="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2 text-xs"
              >
                <span class="text-gray-700">{{ tag }}</span>
                <button @click="toggleTag(tag)" class="ml-2 text-gray-400 hover:text-gray-600">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 min-w-0">
          <!-- Mobile Search and Filter Toggle -->
          <div class="lg:hidden mb-6 space-y-3">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                class="w-full pl-9 pr-8 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-400 outline-none transition-colors"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <button
              @click="showMobileFilters = !showMobileFilters"
              class="w-full flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-all"
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Filter by Tags
                <span v-if="selectedTags.length > 0" class="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                  {{ selectedTags.length }}
                </span>
              </span>
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': showMobileFilters }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Mobile Filters Dropdown -->
            <div v-if="showMobileFilters" class="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-md space-y-2">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-gray-800">Select Tags</span>
                <button
                  v-if="selectedTags.length > 0"
                  @click="selectedTags = []"
                  class="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <button
                v-for="tag in allTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-sm'
                ]"
              >
                <span class="flex items-center">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full mr-2',
                      selectedTags.includes(tag) ? 'bg-white' : 'bg-blue-400'
                    ]"
                  ></span>
                  {{ tag }}
                </span>
                <span :class="selectedTags.includes(tag) ? 'text-white/80' : 'text-gray-500'">
                  {{ getTagCount(tag) }}
                </span>
              </button>
            </div>
          </div>

          <!-- Posts Grid -->
          <div v-if="paginatedPosts.length > 0" class="grid grid-cols-1 gap-6">
            <article 
              v-for="(post, index) in paginatedPosts" 
              :key="post.slug"
              :class="[
                'group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2',
                index === 0 && currentPage === 1 && !searchQuery && selectedTags.length === 0 && isPostRecent(post.frontmatter.date)
                  ? 'border-blue-400 border-2 shadow-xl bg-gradient-to-br from-white/90 to-blue-50/70'
                  : 'border-blue-100 hover:border-blue-300'
              ]"
            >
              <div class="p-6">
                <!-- Post Meta -->
                <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div class="text-xs text-blue-600">
                    {{ formatDate(post.frontmatter.date) }}
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="tag in post.frontmatter.tags" 
                      :key="tag"
                      @click="toggleTag(tag)"
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer',
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                      ]"
                    >
                      {{ tag }}
                    </button>
                  </div>
                </div>

                <!-- Post Content -->
                <router-link :to="`/post/${post.slug}`" class="block group-hover:text-blue-600 transition-colors">
                  <h2 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {{ post.frontmatter.title }}
                  </h2>
                  <p class="text-gray-600 mb-4 leading-relaxed text-sm">
                    {{ post.frontmatter.excerpt }}
                  </p>
                </router-link>

                <!-- Read More Button -->
                <div class="flex justify-between items-center">
                  <router-link 
                    v-if="index === 0 && !searchQuery && selectedTags.length === 0"
                    :to="`/post/${post.slug}`"
                    class="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>Read Article</span>
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </router-link>
                  <div :class="index === 0 && !searchQuery && selectedTags.length === 0 ? 'text-xs text-gray-500' : 'text-xs text-gray-500 ml-auto'">
                    {{ calculateReadTime(post.html) }} min read
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- No Filtered Results State -->
          <div v-else-if="!loading && filteredPosts.length === 0 && allPosts.length > 0" class="text-center py-20">
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-blue-200 shadow-lg">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">No matching articles</h3>
              <p class="text-gray-600 max-w-md mx-auto mb-6">
                No articles match your current search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                @click="clearFilters"
                class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          </div>
          
          <!-- Pagination -->
          <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
            class="mt-8"
          />

          <!-- Newsletter Signup -->
          <div class="mt-12">
            <Newsletter 
              title="Stay Updated"
              :description="`Subscribe to get ${siteConfig.description.toLowerCase()} delivered to your inbox.`"
            />
            
            <!-- RSS Feed Link -->
            <div class="mt-3 text-center">
              <a 
                href="/rss.xml" 
                target="_blank"
                class="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-orange-600 transition-colors"
                title="Subscribe via RSS"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"></path>
                  <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z"></path>
                </svg>
                <span>Subscribe via RSS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div class="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-pulse mx-auto"></div>
        </div>
        <p class="text-blue-600 mt-6 text-lg font-medium">Loading amazing content...</p>
      </div>

      <!-- No Posts State -->
      <div v-else-if="!loading && allPosts.length === 0" class="text-center py-20">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-blue-200 shadow-lg">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">No posts found</h3>
          <p class="text-gray-600 max-w-md mx-auto">
            We're working on some amazing content. Check back soon for interesting articles and insights!
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllPosts, type BlogPost } from '../utils/blog'
import { useSeo } from '../composables/useSeo'
import { getOGImage } from '../utils/ogImage'
import { siteConfig } from '../../site.config.ts'
import Breadcrumb from '../components/Breadcrumb.vue'
import Pagination from '../components/Pagination.vue'
import Newsletter from '../components/Newsletter.vue'

const route = useRoute()
const router = useRouter()
const allPosts = ref<BlogPost[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedTags = ref<string[]>([])
const showMobileFilters = ref(false)
const currentPage = ref(1)
const postsPerPage = 6

onMounted(async () => {
  try {
    allPosts.value = await getAllPosts()
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading posts:', error)
    }
  } finally {
    loading.value = false
  }
})

// Get all unique tags from all posts
const allTags = computed(() => {
  const tags = new Set<string>()
  allPosts.value.forEach(post => {
    post.frontmatter.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

// Filter posts based on search query and selected tags
const filteredPosts = computed(() => {
  let result = allPosts.value

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(query)
      const excerptMatch = post.frontmatter.excerpt.toLowerCase().includes(query)
      const contentMatch = post.html.toLowerCase().includes(query)
      return titleMatch || excerptMatch || contentMatch
    })
  }

  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    result = result.filter(post => {
      return selectedTags.value.some(tag => post.frontmatter.tags.includes(tag))
    })
  }

  return result
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  return filteredPosts.value.slice(startIndex, endIndex)
})

// SEO meta tags for blog listing page
const seoMeta = computed(() => {
  const baseUrl = window.location.origin
  const currentUrl = `${baseUrl}${route.fullPath.split('?')[0]}`
  
  // Add pagination URLs for SEO
  const prevUrl = currentPage.value > 1 
    ? `${currentUrl}?page=${currentPage.value - 1}` 
    : undefined
  
  const nextUrl = currentPage.value < totalPages.value 
    ? `${currentUrl}?page=${currentPage.value + 1}` 
    : undefined
  
  return {
    title: `Blog | ${siteConfig.author} - Software Engineering & Technology`,
    description: siteConfig.description,
    keywords: ['blog', 'software engineering', 'software development', 'vue.js', 'typescript', 'dotnet', 'technology'],
    author: siteConfig.author,
    url: currentUrl,
    image: getOGImage('blog'),
    type: 'website' as const,
    prevUrl,
    nextUrl
  }
})

useSeo(seoMeta)

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog', active: true }
])

const handlePageChange = (page: number) => {
  currentPage.value = page
  // Update URL with page parameter
  router.push({ query: { ...route.query, page: page > 1 ? String(page) : undefined } })
}

// Reset to page 1 when filters change
const resetPagination = () => {
  currentPage.value = 1
}

// Toggle tag selection
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  resetPagination()
}

// Get count of posts for a specific tag
const getTagCount = (tag: string): number => {
  return allPosts.value.filter(post => post.frontmatter.tags.includes(tag)).length
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const isPostRecent = (dateString: string): boolean => {
  const postDate = new Date(dateString)
  const now = new Date()
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  return postDate >= oneMonthAgo
}

const calculateReadTime = (html: string): number => {
  const wordsPerMinute = 200
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
</script>
