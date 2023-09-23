import { resolve } from 'path';
import { defineConfig } from "vite"; // eslint-disable-line
import pugPrecompile from './vite-plugin-pug-precompile';

const root = resolve(__dirname, 'src');

export default defineConfig({
  root,
  base: '',
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
  },
  publicDir: resolve(__dirname, 'static'),
  plugins: [pugPrecompile()],
});
