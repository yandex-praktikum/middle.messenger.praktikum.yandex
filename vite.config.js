import { resolve, parse } from "path";
import { defineConfig } from "vite";

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
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
