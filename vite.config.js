import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'build'),
    assetsDir: 'static/images',
    minify: true,
  },
});
