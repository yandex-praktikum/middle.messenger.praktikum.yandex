import { resolve } from 'path';
import { defineConfig } from "vite"

import vitePugPlugin from 'vite-plugin-pug-transformer'

const locals = { bundler: 'Vite' };
const root = resolve(__dirname, 'src');

export default defineConfig({
  root,
  base: '',
  plugins: [vitePugPlugin({ pugLocals: locals })],
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        singIn: resolve(root, 'index.html'),
        registration: resolve(root, 'registration.html'),
        chatsAndChat: resolve(root, 'chats-and-chat.html'),
        userSettings: resolve(root, 'user-settings.html'),
        userEditingSettings: resolve(root, 'user-editing-settings.html'),
        userEditingPassword: resolve(root, 'user-editing-password.html'),
        404: resolve(root, '404.html'),
        500: resolve(root, '500.html'),
      },
    }
  },
  publicDir: resolve(__dirname, 'static'),
})
