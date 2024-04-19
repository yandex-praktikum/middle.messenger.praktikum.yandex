import path from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  plugins: [eslint(), stylelint()],
})
