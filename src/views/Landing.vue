<template>
  <div class="w-screen h-screen md:flex items-start lg:items-center transition-all duration-700 ease-out bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Particles Background -->
    <div id="particles-js" class="absolute inset-0"></div>
    
    <!-- Content Card -->
    <div class="md:shadow-lg bg-white md:rounded-lg p-8 font-medium text-gray-600 z-10 md:m-20 md:w-2/3 lg:w-1/2 max-w-screen-lg transition-all duration-700 ease-out">
      <div>
        <p class="text-2xl text-gray-400">Hi, I'm</p>
        <h1 class="text-5xl text-blue-500">Joël Tankam</h1>
        <p class="text-xl my-5">
          I'm a Software Engineer based in <span class="text-blue-500">Casablanca, Morocco</span>.
          My deep passion for the .NET doesn't hold me back from enjoying Javascript environments
          (well, except the language itself; TypeScript 🚀, pun intended).
          On my blog, I write mostly about these two ecosystems, as well as whatever comes across my mind.
        </p>
        <p class="my-5">
          Feel free to reach out to me on
          <a href="https://twitter.com/joeltankam" rel="noopener noreferrer" target="_blank"
            class="transition duration-300 ease-in-out text-blue-500 inline-block border-b-2 border-white transform hover:border-blue-500">
            Twitter
          </a>.
        </p>
        <p class="my-5">
          <router-link 
            to="/blog"
            class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Read My Blog</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </router-link>
        </p>
      </div>
      <hr class="border-gray-300 w-1/3" />
      <div class="pt-5 flex flex-wrap gap-2">
        <a href="https://github.com/joeltankam" target="_blank" rel="noopener noreferrer"
          class="border-2 border-gray-300 rounded-md py-1 px-2 inline-block transition duration-300 ease-in-out hover:text-gray-900 hover:border-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-4 w-4 inline-block mb-1">
            <title>GitHub</title>
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          @joeltankam
        </a>
        <a href="https://twitter.com/joeltankam" target="_blank" rel="noopener noreferrer"
          class="border-2 border-gray-300 rounded-md py-1 px-2 inline-block transition duration-300 ease-in-out hover:text-blue-500 hover:border-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-4 w-4 inline-block mb-1">
            <title>Twitter</title>
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
          @joeltankam
        </a>
        <a href="https://www.linkedin.com/in/joeltankam/" target="_blank" rel="noopener noreferrer"
          class="border-2 border-gray-300 rounded-md py-1 px-2 inline-block transition duration-300 ease-in-out hover:text-blue-600 hover:border-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current h-4 w-4 inline-block mb-1">
            <title>LinkedIn</title>
            <path
              d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
          /joeltankam
        </a>
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
