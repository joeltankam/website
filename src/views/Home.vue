<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100">
      <div class="max-w-6xl mx-auto px-6 py-12">
        <div class="text-center">
          <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            My Blog
          </h1>
          <p class="text-xl text-blue-700 max-w-2xl mx-auto leading-relaxed">
            Exploring the world of web development, technology insights, and creative coding adventures
          </p>
          <div class="mt-8 flex justify-center space-x-4">
            <div class="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
              <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span class="text-blue-700 font-medium">{{ posts.length }} Articles Published</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Blog Posts -->
    <main class="max-w-6xl mx-auto px-6 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div class="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-pulse mx-auto"></div>
        </div>
        <p class="text-blue-600 mt-6 text-lg font-medium">Loading amazing content...</p>
      </div>

      <!-- No Posts State -->
      <div v-else-if="posts.length === 0" class="text-center py-20">
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

      <!-- Posts Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <article 
          v-for="(post, index) in posts" 
          :key="post.slug"
          class="group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-300 hover:-translate-y-2"
          :class="index === 0 ? 'lg:col-span-2' : ''"
        >
          <div class="p-8" :class="index === 0 ? 'lg:p-12' : ''">
            <!-- Post Meta -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ post.frontmatter.author[0].toUpperCase() }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ post.frontmatter.author }}</p>
                  <p class="text-sm text-blue-600">{{ formatDate(post.frontmatter.date) }}</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in post.frontmatter.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Post Content -->
            <router-link :to="`/post/${post.slug}`" class="block group-hover:text-blue-600 transition-colors">
              <h2 
                class="font-bold mb-4 group-hover:text-blue-600 transition-colors" 
                :class="index === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl'"
              >
                {{ post.frontmatter.title }}
              </h2>
              <p 
                class="text-gray-600 mb-6 leading-relaxed" 
                :class="index === 0 ? 'text-xl' : 'text-base'"
              >
                {{ post.frontmatter.excerpt }}
              </p>
            </router-link>

            <!-- Read More Button -->
            <div class="flex justify-between items-center">
              <router-link 
                :to="`/post/${post.slug}`"
                class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Read Article</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </router-link>
              <div class="text-sm text-gray-500">
                {{ calculateReadTime(post.html) }} min read
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllPosts, type BlogPost } from '../utils/blog'

const posts = ref<BlogPost[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    console.log('Loading posts...')
    posts.value = await getAllPosts()
    console.log('Loaded posts:', posts.value)
  } catch (error) {
    console.error('Error loading posts:', error)
  } finally {
    loading.value = false
  }
})

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
</script>