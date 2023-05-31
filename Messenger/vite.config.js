import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [react(), handlebars()],
}) 

