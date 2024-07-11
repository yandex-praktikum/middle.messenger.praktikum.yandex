import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src/pages')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
    plugins: [handlebars()],
    root,
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                registration: resolve(root, 'registration.html'),
                serverError: resolve(root, 'serverError.html'),
                notFound: resolve(root, 'notFound.html'),
                chatSelect: resolve(root, 'chatSelect.html'),
                chat: resolve(root, 'chat.html'),
                profile: resolve(root, 'profile.html'),
                changeProfile: resolve(root, 'changeProfile.html'),
                changePassword: resolve(root, 'changePassword.html'),
            }
        }
    }
})
