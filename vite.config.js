import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    root: "./src",
    plugins: [
        handlebars(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                relativeUrls: true,
                javascriptEnabled: true
            },
        },
    }
})