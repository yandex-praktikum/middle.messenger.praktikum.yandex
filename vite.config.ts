/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vitePluginHandlebarsPrecompile from './vite-plugin-handelbars-precompile'

export default defineConfig({
  plugins: [vitePluginHandlebarsPrecompile()],
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  server: {
    open: 'index.html',
  },
})
