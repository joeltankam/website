import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { Buffer } from 'buffer'

// Polyfill Buffer for browser compatibility
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer
}

createApp(App).use(router).mount('#app')