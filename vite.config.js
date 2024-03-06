import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [eslint()],
});
