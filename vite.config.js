import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Buffer } from 'buffer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
