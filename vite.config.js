import {defineConfig} from 'vite'

export default defineConfig({
    publicDir: 'public',
    base: './dist',
    css: {
        devSourcemap: true,
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/style/_variables.scss"; @import "./src/assets/style/_mixin.scss";`
            }
        }
    },
    server: {
        port: 3000
    },
})

