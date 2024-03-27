import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import stylelint from "vite-plugin-stylelint";

export default defineConfig({
  plugins: [stylelint(options), handlebars()],
});
