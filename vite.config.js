import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import postcssVars from 'postcss-css-variables';
import postcssAutoprefixer from 'autoprefixer';

import handlebars from './vite/plugin';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    assetsDir: 'src',
    emptyOutDir: true
  },
  plugins: [
    checker({ typescript: true }),
    handlebars()
  ],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssNested(),
        postcssVars(),
        postcssAutoprefixer()
      ]
    },
  },
  resolve: {
    alias: [
      { find: '@api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@controllers', replacement: fileURLToPath(new URL('./src/controllers', import.meta.url)) },
      { find: '@layout', replacement: fileURLToPath(new URL('./src/layout', import.meta.url)) },
      { find: '@models', replacement: fileURLToPath(new URL('./src/models', import.meta.url)) },
      { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
			{ find: '@services', replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
      { find: '@utilities', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
      { find: '@constants', replacement: fileURLToPath(new URL('./src/constants.ts', import.meta.url)) }
    ]
  }
});
