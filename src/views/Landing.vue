<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Particles Background -->
    <div id="particles-js" class="absolute inset-0"></div>
    
    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
      <div class="max-w-4xl w-full">
        <!-- Main Card -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-100 transition-all duration-700 ease-out">
          <div class="mb-8">
            <p class="text-2xl text-blue-400 mb-2">Hi, I'm</p>
            <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Joël Tankam
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed mb-6">
              I'm a Software Engineer based in <span class="text-blue-600 font-semibold">Casablanca, Morocco</span>.
              My deep passion for the .NET doesn't hold me back from enjoying Javascript environments
              (well, except the language itself; TypeScript 🚀, pun intended).
              On my blog, I write mostly about these two ecosystems, as well as whatever comes across my mind.
            </p>
            <p class="text-lg text-gray-600 mb-6">
              Feel free to reach out to me on
              <a href="https://twitter.com/joeltankam" rel="noopener noreferrer" target="_blank"
                class="text-blue-600 font-medium hover:text-blue-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300">
                Twitter
              </a>.
            </p>
            <div class="mb-8">
              <router-link 
                to="/blog"
                class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Read My Blog</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-blue-200 my-8"></div>

          <!-- Social Links -->
          <div class="flex flex-wrap gap-3">
            <a href="https://github.com/joeltankam" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 border-2 border-blue-200 rounded-xl hover:border-gray-900 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors">
                <title>GitHub</title>
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span class="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">@joeltankam</span>
            </a>
            
            <a href="https://twitter.com/joeltankam" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-5 w-5 text-blue-400 group-hover:text-blue-500 transition-colors">
                <title>Twitter</title>
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              <span class="text-gray-700 font-medium group-hover:text-blue-500 transition-colors">@joeltankam</span>
            </a>
            
            <a href="https://www.linkedin.com/in/joeltankam/" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors">
                <title>LinkedIn</title>
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
              <span class="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">/joeltankam</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Initialize particles.js if available
  if (typeof (window as any).particlesJS !== 'undefined') {
    (window as any).particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#3b82f6' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3b82f6',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        }
      },
      retina_detect: true
    })
  }
})
</script>
