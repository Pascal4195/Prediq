import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Ensures small naming mismatches don't always break the build
    outDir: 'dist',
    rollupOptions: {
      external: [], // Ensure no essential packages are accidentally excluded
    }
  }
})
