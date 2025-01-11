import { defineConfig } from 'vite'
import handlebars from './src/vite-plugin-handlebars-precompile';

export default defineConfig({
  plugins: [
    handlebars()
  ],
  publicDir: './src/static'
})
