import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [eslint(), stylelint()],
})
