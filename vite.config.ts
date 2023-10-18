import { resolve } from 'path';
import { defineConfig } from "vite";
import pugPrecompile from './vite-plugin-pug-precompile';

const root = resolve(__dirname, 'src');

export default defineConfig({
  root,
  base: '',
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  publicDir: resolve(__dirname, 'static'),
  plugins: [pugPrecompile()],
});
