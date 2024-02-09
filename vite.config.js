import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: '/index.html',
        login: '/pages/login/login.html',
        registration: '/pages/registration/registration.html',
        chat: '/pages/chat/chat.html',
        profile: '/pages/profile/profile.html',
        notFoundError: '/pages/404/404.html',
        serverError: '/pages/500/500.html',
      }
    }
  },
  plugins: [
    handlebars()
  ]
});
