import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:10000',
      '/claim': 'http://localhost:10000',
      '/history': 'http://localhost:10000',
    }
  }
})
