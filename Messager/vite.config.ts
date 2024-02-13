import {resolve} from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'




export default defineConfig({
    root: resolve(__dirname,'src'),
    build:{
        outDir:resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
              main: resolve(__dirname, './src/index.html'),
              auth: resolve(__dirname, './src/pages/auth/auth.html'),
              registration: resolve(__dirname, './src/pages/registration/registration.html'),
              chat: resolve(__dirname, './src/pages/chat/chat.html'),
              profile: resolve(__dirname, './src/pages/profile/profile.html'),
              profileEditPassword: resolve(
                __dirname,
                './src/pages/profileEditPassword/profileEditPassword.html'
              ),
              profileEditUserInfo: resolve(
                __dirname,
                './src/pages/profileEditUserInfo/profileEditUserInfo.html'
              ),
              404: resolve(__dirname, './src/pages/404/404.html'),
              500: resolve(
                __dirname,
                './src/pages/500/500.html'
              ),
            },
          },
    },

//@ts-ignore
    plugins:[handlebars({
        partialDirectory:[
            resolve(__dirname, 'src/components'),
            resolve(__dirname, 'src/modules')
        ],

        context:{}
    },

    
    )]
})