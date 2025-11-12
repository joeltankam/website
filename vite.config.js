import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { Buffer } from 'buffer'
import { sitemapPlugin } from './plugins/vite-plugin-sitemap'
import rssPlugin from './plugins/vite-plugin-rss'
import { siteConfig } from './site.config.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    sitemapPlugin({ hostname: siteConfig.hostname }),
    rssPlugin({ hostname: siteConfig.hostname })
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
  },
  build: {
    // Production optimizations
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          'vue-vendor': ['vue', 'vue-router'],
          'markdown': ['marked', 'gray-matter'],
          'syntax': ['highlight.js', 'mermaid']
        }
      }
    },
    // Enable gzip compression hints
    reportCompressedSize: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  }
})
