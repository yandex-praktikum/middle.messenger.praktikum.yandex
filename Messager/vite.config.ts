import {resolve} from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'




export default defineConfig({
    root: resolve(__dirname,'src'),
    build:{
        outDir:resolve(__dirname, 'dist')
    },

//@ts-ignore
    plugins:[handlebars({
        partialDirectory:[
            resolve(__dirname, 'src/components'),
            resolve(__dirname, 'src/modules')
        ]
    })]
})