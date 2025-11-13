<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
    <!-- Navigation Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-primary-100 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link 
            to="/" 
            class="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Home</span>
          </router-link>
          
          <div class="text-right">
            <h2 class="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">About Me</h2>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <!-- Breadcrumb -->
      <Breadcrumb 
        :items="breadcrumbItems"
        class="mb-6"
      />
      
      <!-- Hero Section -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-primary-100 mb-8">
        <h1 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
          About Me
        </h1>
        
        <div class="space-y-4 text-lg text-gray-700 leading-relaxed">
          <!-- Profile Picture - floated left -->
          <img 
            src="/assets/images/me.jpg" 
            :alt="`${siteConfig.author} - Software Engineer based in Paris, France`"
            loading="lazy"
            @click="showZoomedImage = true"
            class="float-left mr-6 mb-4 w-80 h-80 rounded-2xl object-cover shadow-lg border-4 border-primary-100 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          
          <p>
            Hi, I'm <span class="font-bold text-xl text-primary-600">{{ siteConfig.author }}</span> — a random dude who's been quite passionate about technology since a young age.
            Born in <span class="font-bold">Cameroon</span>, I left at 14 after graduating high school to study in <span class="font-bold">Morocco</span>, where I spent several years discovering the culture, and the years after that regretting never learning Arabic properly (actually, <a href="https://en.wikipedia.org/wiki/Moroccan_Arabic" target="_blank" rel="noopener noreferrer" class="text-gray-800 italic underline hover:text-primary-600">Darija</a>).
          </p>
          <p>
            Currently, I call <span class="font-bold text-primary-600">Paris, France</span> home, and I quite love the city.
            Like 100% of "Parisians", according to my own data sources, I actually live in the suburbs of Paris, but I'm constantly amazed by the architecture and cultural richness of the inner city.
            As a modern and respectable member of the human species, I spend a shameful amount of time doomscrolling, but from time to time you might find me <span class="font-semibold text-gray-800">reading books</span>, watching <span class="font-semibold text-gray-800">cycling races</span> (mainly nowadays, though I've been a longtime fan of <span class="font-semibold">football and basketball</span>), pretending I'll remember anything from the <span class="font-semibold text-gray-800">scientific documentaries</span> I'm watching, or trying to be less terrible at <span class="font-semibold text-gray-800">chess</span>.
          </p>
          <p>
            I'm a big-time <span class="font-semibold text-gray-800">solo traveler</span>, finding it to be one of the most enriching experiences.
            Over the years, I've wandered across Europe and the USA, often planning my trips around <span class="font-semibold">museums and art galleries</span>, <span class="font-semibold">sightseeing</span> of all sorts, <span class="font-semibold">meeting strangers</span>, and trying local stuff.
            I'm not exactly the guy who could tell you precisely which artist painted what, but there's something nice about standing in front of a beautiful artwork or wandering through historical exhibitions.
          </p>
          <p>
            I also spent a some years taking <span class="font-semibold text-gray-800">theater classes</span> and even performed in front of live audiences — an experience that was supposed to teach me a lot about communication, presence, and stepping outside my comfort zone.
            The result? I'm not sure, but it was fun!
          </p>
          <p>
            On the professional side, I work as a <span class="font-bold text-primary-600">software engineer and technical lead</span> with something like <span class="font-semibold text-gray-800">{{ yearsOfExperience }}+ years of experience</span>.
            I started my career in <span class="font-semibold">Morocco</span>, where I worked for two years before being relocated to <span class="font-semibold">Paris</span>.
            I've worked with various programming languages, starting with <span class="font-semibold">Pascal</span> (good old days) and continuing with <span class="font-semibold">JavaScript</span> (jQuery remains the pinnacle of web development), <span class="font-semibold">PHP</span> (not much better duos than MySQL and phpMyAdmin), <span class="font-semibold">Python</span> (no comment), <span class="font-semibold">Java</span> (the inferior C#), and now mostly the <span class="font-semibold">.NET ecosystem</span>.
            I mostly work on building scalable systems and developer tools.
          </p>
        </div>
      </div>

      <!-- Skills & Technologies -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-primary-100 mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Proficient With</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">.NET Ecosystem</span>
              <span class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">Software Architecture</span>
              <span class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">DevOps</span>
              <span class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">Distributed Systems</span>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Familiar With</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Cloud Platforms</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Monitoring and Observability</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Infrastructure as Code</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">QA & Release Management</span>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Experience With</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Database Management</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">JavaScript/TypeScript Ecosystem</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">HTML5/CSS3</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">UI/UX</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Java</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Python</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-primary-100 mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Professional Experience</h2>
        
        <div class="space-y-6">
          <!-- Current Role -->
          <div class="border-l-4 border-primary-600 pl-6">
            <h3 class="text-xl font-bold text-gray-800">R&D Software Engineer</h3>
            <p class="text-primary-600 font-medium mb-3">Société Générale CIB • Jan 2024 - Present • Paris, France</p>
            <p class="text-gray-700 leading-relaxed mb-4">
              Building a multi-cloud system to provide real-time market data. Maintaining and improving microservices, designing and implementing new architecture, managing CI/CD pipelines, stakeholder management, and providing technical and functional support for clients.
            </p>
            <div class="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Maintaining and improving microservices</span>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Designing and implementing new architecture</span>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Responsible for CI/CD pipelines</span>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Stakeholder management</span>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Technical & functional support for clients</span>
              </div>
            </div>
          </div>

          <!-- 2018-2023 Role -->
          <div class="border-l-4 border-gray-300 pl-6">
            <h3 class="text-lg font-bold text-gray-800">R&D Software Engineer</h3>
            <p class="text-gray-600 font-medium mb-2">Société Générale CIB • Aug 2018 - Dec 2023 • Casablanca, Morocco - Paris, France</p>
            <p class="text-gray-700 text-sm">
              Led .NET Core migration in a vast ecosystem. Project manager and technical lead, developed CI/CD and efficiency tools, speaker on various .NET in-depth topics, mentorship and new technology monitoring.
            </p>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-primary-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Let's Connect</h2>
        
        <p class="text-gray-600 mb-6">
          I'm always interested in hearing about new opportunities, collaborating on interesting projects, or discussing technology and software engineering. Feel free to reach out!
        </p>

        <div class="flex flex-wrap gap-4">
          <a :href="`https://github.com/${siteConfig.social.github}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

          <a :href="`https://linkedin.com/in/${siteConfig.social.linkedin}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          <!--
          <a :href="`https://x.com/${siteConfig.social.twitter}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X
          </a>
          -->

          <a :href="`https://bsky.app/profile/${siteConfig.social.bluesky}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
            </svg>
            Bluesky
          </a>

          <a href="mailto:joel.tankam@gmail.com" class="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-xl hover:bg-secondary-700 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Email
          </a>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-bold text-gray-800 mb-3">Languages</h3>
          <div class="flex gap-6">
            <div>
              <span class="font-medium text-gray-700">French:</span>
              <span class="text-primary-600 ml-2">Native</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">English:</span>
              <span class="text-primary-600 ml-2">Fluent</span><em class="text-gray-600 ml-1">(I think)</em>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Zoom Modal -->
    <div 
      v-if="showZoomedImage"
      @click="showZoomedImage = false"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
    >
      <img 
        src="/assets/images/me.jpg" 
        :alt="`${siteConfig.author} - Software Engineer based in Paris, France`"
        loading="eager"
        class="max-w-full max-h-full rounded-2xl shadow-2xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeo } from '../composables/useSeo'
import { getOGImage } from '../utils/ogImage'
import { siteConfig } from '../../site.config.ts'
import Breadcrumb from '../components/Breadcrumb.vue'

const route = useRoute()

// Zoom modal state
const showZoomedImage = ref(false)

// Calculate years of experience from August 2018 to now
const yearsOfExperience = computed(() => {
  const startDate = new Date('2018-08-01')
  const now = new Date()
  const years = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  return Math.floor(years)
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', active: true }
])

// SEO meta tags for about page
const seoMeta = computed(() => {
  const baseUrl = window.location.origin
  const currentUrl = `${baseUrl}${route.fullPath}`
  
  return {
    title: `About | ${siteConfig.author} - Software Engineer`,
    description: `Software Engineer with ${yearsOfExperience.value}+ years of experience in distributed systems, cloud architecture, and software development. Specializing in .NET, microservices, and real-time data processing.`,
    keywords: ['about', siteConfig.author, 'software engineer', 'distributed systems', '.NET', 'cloud architecture', 'Paris', 'resume', 'CV'],
    author: siteConfig.author,
    url: currentUrl,
    image: getOGImage('about'),
    type: 'website' as const
  }
})

useSeo(seoMeta)
</script>


