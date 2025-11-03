<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol 
      class="flex items-center space-x-2 text-sm"
      itemscope 
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="flex items-center"
        itemprop="itemListElement" 
        itemscope 
        itemtype="https://schema.org/ListItem"
      >
        <router-link 
          v-if="!item.active"
          :to="item.to"
          class="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          itemprop="item"
        >
          <span itemprop="name">{{ item.label }}</span>
        </router-link>
        <span 
          v-else
          class="text-gray-600 font-medium"
          itemprop="name"
        >
          {{ item.label }}
        </span>
        <meta itemprop="position" :content="String(index + 1)">
        
        <svg 
          v-if="index < items.length - 1"
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to: string
  active?: boolean
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
