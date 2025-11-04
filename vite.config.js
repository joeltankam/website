import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Buffer } from 'buffer'
import { sitemapPlugin } from './vite-plugin-sitemap'
import rssPlugin from './vite-plugin-rss'
import { siteConfig } from './site.config.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
  }
})
