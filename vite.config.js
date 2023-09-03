import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
//import handlebars from './vite-plugin-handlebars-precompile.ts';

export default defineConfig({
    root: resolve(__dirname, 'src/'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                //profile: resolve(__dirname, 'src/profile.html'),
                //login: resolve(__dirname, 'src/login.html'),
                //signin: resolve(__dirname, 'src/signin.html'),
                //'404': resolve(__dirname, 'src/404.html'),
                //'500': resolve(__dirname, 'src/500.html'),
            },
        },
        outDir: resolve(__dirname, 'dist/'),
    },
    plugins: [
        //handlebars(),
        viteStaticCopy({
            targets: [
                { src: 'assets/img/avatars/**/*', dest: 'assets/img/avatars/' },
            ],
        }),
    ],
})
