import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';

export default {
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'My Messenger'
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/global.scss";`
      }
    }
  }
};
