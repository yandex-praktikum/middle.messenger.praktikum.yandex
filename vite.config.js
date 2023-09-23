import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: resolve(__dirname, 'src/'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
        outDir: resolve(__dirname, 'dist/'),
        emptyOutDir: true,
    },
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true,
    },
    plugins: [
        viteStaticCopy({
            targets: [
                { src: 'assets/img/avatars/**/*', dest: 'assets/img/avatars/' },
            ],
        }),
    ],
})
