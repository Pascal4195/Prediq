import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // This allows you to view your app on your phone 
    // if you're running it on a local network/Replit
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      // This makes your imports cleaner: 
      // instead of ../../components, you can use @/components
      '@': '/src',
    },
  },
})
