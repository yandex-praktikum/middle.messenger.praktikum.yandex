import { defineConfig } from 'vite';
import { resolve } from 'path';

import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, 'src'),
   
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'src/index.html'),
            chat: resolve(__dirname, 'src/pages/chats/chat.html'),
            login: resolve(__dirname, 'src/pages/login/login.html'),
            accounting: resolve(__dirname, 'src/pages/profiles/accounting.html'),
            pasword: resolve(__dirname, 'src/pages/profiles/pasword.html'),
            profile: resolve(__dirname, 'src/pages/profiles/profile.html'),
            registration: resolve(__dirname, 'src/pages/registration/registration.html'),
            
          },
        },
      },
    plugins: [handlebars({
        context: { username: 'Andrey', },
        partialDirectory: resolve(__dirname, 'src/partials')
    }
    )],
})
