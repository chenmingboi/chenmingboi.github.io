import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/data/profile.js'
import { seoTags } from './scripts/seo.mjs'

export default defineConfig({
  base: '/',
  plugins: [react(), {
    name: 'profile-metadata',
    transformIndexHtml: () => seoTags(profile),
  }],
})
