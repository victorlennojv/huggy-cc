import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '#imports': fileURLToPath(new URL('./.nuxt/types/imports.d.ts', import.meta.url))
    },
    setupFiles: ['./vitest.setup.ts']
  }
}) 