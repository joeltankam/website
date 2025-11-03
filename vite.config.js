import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Buffer } from 'buffer'
import { sitemapPlugin } from './vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sitemapPlugin({ hostname: 'https://joeltankam.com' })
  ],
  define: {
    'global': {},
  },
  resolve: {
    alias: {
      'buffer': 'buffer',
    }
  },
  optimizeDeps: {
    include: ['buffer'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
