import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    cors: { origin: "*" },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // Django backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});