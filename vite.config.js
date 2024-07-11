import {resolve} from 'path'
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars'
import {pageData} from './src/pages/pages'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        assetsInlineLimit: Number.MAX_SAFE_INTEGER,
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
                signin: resolve(__dirname, './src/pages/authPage/signin/signin.html'),
                login: resolve(__dirname, './src/pages/authPage/login/login.html'),
                404: resolve(__dirname, './src/pages/errorPage/404.html'),
                500: resolve(__dirname, './src/pages/errorPage/500.html'),
                profile: resolve(__dirname, './src/pages/profilePages/profile.html'),
                profileChangeInfo: resolve(__dirname, './src/pages/profilePages/profileChangeInfo.html'),
                profileChangePassword: resolve(__dirname, './src/pages/profilePages/profileChangePassword.html'),
                chat: resolve(__dirname, './src/pages/chat/chat.html'),
            },
        },
    },
    server: {
        port: 4000,
    },
    preview: {
        port: 3000
    },
    plugins: [
        handlebars({
            partialDirectory: [resolve(__dirname, 'src/components'),],
            context(pagePath) {
                return pageData[pagePath]
            },
        }),
    ],
})
