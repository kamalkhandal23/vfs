import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/vrinda-foundation/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
