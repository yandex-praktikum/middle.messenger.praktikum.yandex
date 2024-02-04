import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import indexData from './src/data.js';
import loginData from './src/pages/login/data.js';
import registrationData from './src/pages/registration/data.js';
import profileData from './src/pages/profile/data.js';
import serverErrorData from './src/pages/500/data.js';
import notFoundErrorData from './src/pages/404/data.js';

const appData = {...indexData, ...loginData, ...registrationData, ...profileData, ...serverErrorData, ...notFoundErrorData}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  }, 
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
    context(pagePath) {
      return appData[pagePath];
    },
    helpers: {
      indexIncrease: (value) => ++value,
    },
  })],
}) 
