import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path";

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, "src/partials"),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "src/pages/auth/login.html"),
        register: path.resolve(__dirname, "src/pages/auth/register.html"),
        404: path.resolve(__dirname, "src/pages/errors/404.html"),
        500: path.resolve(__dirname, "src/pages/errors/500.html"),
        profile: path.resolve(__dirname, "src/pages/profile/profile.html"),
        "edit-profile": path.resolve(
          __dirname,
          "src/pages/edit-profile/edit-profile.html"
        ),
        "edit-password": path.resolve(
          __dirname,
          "src/pages/edit-profile/edit-password.html"
        ),
        chat: path.resolve(__dirname, "src/pages/chat/chat.html"),
      },
    },
  },
  server: {
    host: "127.0.0.1",
    open: true,
  },
});
