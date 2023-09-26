import { resolve } from 'path';
import { defineConfig } from "vite";
import pugPrecompile from './vite-plugin-pug-precompile';

const root = resolve(__dirname, 'src');

console.log(__dirname);

export default defineConfig({
  root,
  base: '',
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        registration: resolve(__dirname, 'src/registration/index.html'),
        page404: resolve(__dirname, 'src/404/index.html'),
        page500: resolve(__dirname, 'src/500/index.html'),
        chatsAndchat: resolve(__dirname, 'src/chats-and-chat/index.html'),
        userSettings: resolve(__dirname, 'src/user-settings/index.html'),
        editingSettings: resolve(__dirname, 'src/editing-settings/index.html'),
        editingPassword: resolve(__dirname, 'src/editing-password/index.html'),
      },
    },
  },
  publicDir: resolve(__dirname, 'static'),
  plugins: [pugPrecompile()],
});
