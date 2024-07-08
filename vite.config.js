import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { loginData } from './src/pages/authPage/login/login';
import { signinData } from './src/pages/authPage/signin/signin';

const pageData = {
    '/index.html': { title: 'index' },
    '/pages/authPage/login/login.html': loginData,
    '/pages/authPage/signin/signin.html': signinData,
};

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
                signin: resolve(__dirname, './src/pages/authPage/signin/signin.html'),
                login: resolve(__dirname, './src/pages/authPage/login/login.html'),
            },
        },
    },
    server: {
        port: 4000,
    },
    plugins: [
        handlebars({
            partialDirectory: [resolve(__dirname, 'src/partials'), resolve(__dirname, 'src/components')],
            context(pagePath) {
                return pageData[pagePath];
            },
        }),
    ],
});
