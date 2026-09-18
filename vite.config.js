import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.MODENA_ENV': JSON.stringify(process.env.MODENA_ENV || 'staging'),
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome80',
    sourcemap: false,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})