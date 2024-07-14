import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/index.html'),
        entrance: resolve(__dirname, './src/entrance/entrance.html'),
        registration: resolve(
          __dirname,
          './src/registration/registration.html'
        ),
        error: resolve(__dirname, './src/404/404.html'),
        error2: resolve(__dirname, './src/500/500.html'),
        profile: resolve(__dirname, './src/profile/profile.html'),
        changeData: resolve(__dirname, './src/changeData/changeData.html'),
        changePassword: resolve(
          __dirname,
          './src/changePassword/changePassword.html'
        ),
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        username: 'PETER',
      },
    }),
  ],
});
