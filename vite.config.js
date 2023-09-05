import { resolve, parse } from "path";
import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          if (
            parse(asset.name).ext === ".svg" ||
            parse(asset.name).ext === ".png"
          ) {
            return "assets/[name][extname]";
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
