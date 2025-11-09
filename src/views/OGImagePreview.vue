<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <router-link 
          to="/blog" 
          class="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Back to Blog</span>
        </router-link>
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-2">OG Image Preview</h1>
      <p class="text-gray-600 mb-8">
        Preview of dynamically generated Open Graph images for blog posts (1200x630px)
      </p>

      <div class="space-y-8">
        <div 
          v-for="(post, index) in posts" 
          :key="index"
          class="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ post.frontmatter.title }}</h2>
          
          <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
            <img 
              :src="getPostOGImage(post)" 
              :alt="`OG Image for ${post.frontmatter.title}`"
              class="w-full"
            />
          </div>
          
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Author:</strong> {{ siteConfig.author }}
            </div>
            <div>
              <strong>Date:</strong> {{ post.frontmatter.date }}
            </div>
            <div class="col-span-2">
              <strong>Excerpt:</strong> {{ post.frontmatter.excerpt }}
            </div>
            <div class="col-span-2">
              <strong>Tags:</strong> {{ post.frontmatter.tags.join(', ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Example -->
      <div class="mt-12 bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Custom OG Image Generator</h2>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input 
              v-model="customTitle" 
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter a title..."
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="customDescription" 
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter a description..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input 
              v-model="customTags" 
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="vue, typescript, tutorial"
            />
          </div>
          
          <button 
            @click="generateCustomImage"
            class="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all"
          >
            Generate OG Image
          </button>
        </div>
        
        <div v-if="customImageUrl" class="border-2 border-gray-200 rounded-lg overflow-hidden">
          <img 
            :src="customImageUrl" 
            alt="Custom OG Image"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllPosts, type BlogPost } from '../utils/blog'
import { generateOGImage, generateBlogPostOGImage } from '../utils/ogImage'
import { siteConfig } from '../../site.config'

const posts = ref<BlogPost[]>([])
const customTitle = ref('Build a Modern Web App with Vue.js and TypeScript')
const customDescription = ref('Learn how to create a scalable, type-safe web application using Vue.js 3, TypeScript, and modern development practices.')
const customTags = ref('vue, typescript, web-development')
const customImageUrl = ref('')

onMounted(async () => {
  // Get first 3 posts for preview
  const allPosts = await getAllPosts()
  posts.value = allPosts.slice(0, 3)
  
  // Generate initial custom image
  generateCustomImage()
})

function getPostOGImage(post: BlogPost): string {
  return generateBlogPostOGImage(post)
}

function generateCustomImage() {
  const tags = customTags.value.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  customImageUrl.value = generateOGImage({
    title: customTitle.value,
    description: customDescription.value,
    author: siteConfig.author,
    date: new Date().toISOString(),
    tags
  })
}
</script>
