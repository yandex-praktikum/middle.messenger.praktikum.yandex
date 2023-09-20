import {resolve} from 'path';
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir:resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        copyPublicDir:true,
        emptyOutDir: true,


    },
    plugins: [
        handlebars({}) as Plugin,
    ],
})

