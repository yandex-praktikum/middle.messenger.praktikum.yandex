import { defineConfig } from 'vite'
import {resolve} from 'path'
import handlebars from 'vite-plugin-handlebars'
export default defineConfig({

  plugins: [
    
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    })
    ],

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          auth: resolve(__dirname, 'src/pages/auth/auth.html'),
          error404: resolve(__dirname, 'src/pages/404/404.html'),
          error500: resolve(__dirname, 'src/pages/500/500.html'),
          chats: resolve(__dirname, 'src/pages/chats/chats.html'),
          profile: resolve(__dirname, 'src/pages/profile/profile.html'),
          registation: resolve(__dirname, 'src/pages/registation/registation.html'),
        }
      }
    }

})