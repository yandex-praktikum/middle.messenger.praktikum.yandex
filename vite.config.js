import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    root: "./src",
    build: {
        rollupOptions: {
            input: './src/index.html',
            output:
                {
                    format: 'es',
                    strict: false,
                    dir: 'dist/',
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name].js`,
                    assetFileNames: `assets/[name].[ext]`,
                }
        }
    },
    plugins: [
        handlebars(),
    ],
})