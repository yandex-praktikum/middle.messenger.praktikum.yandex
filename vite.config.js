import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import handlebars from 'vite-plugin-handlebars';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
    plugins: [
        stylelint({
            fix: true,
        }),
        handlebars({
            partialDirectory: resolve(__dirname, 'src'),
        }),
        eslint({
            fix: true,
        }),
    ],
});
