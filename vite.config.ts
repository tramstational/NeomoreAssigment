/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    }
  },
})
