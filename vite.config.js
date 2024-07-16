
import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
    '/index.html': {
      title: 'Проектная работа 1-й спринт',
      links: [
        {
          title: 'Авторизация',
          link: './pages/login/index.html'
        },
        {
          title: 'Регистрация',
          link: './pages/sign-up/index.html'
        },
        {
          title: 'Cтраница чата',
          link: './pages/messenger/index.html'
        },
        {
          title: 'Профиль пользователя',
          link: './pages/profile/index.html'
        },
        {
          title: 'Страница редактирования информации о пользователе',
          link: './pages/profile-change-data/index.html'
        },
        {
          title: 'Страница смены пароля',
          link: './pages/profile-change-password/index.html'
        },
        {
          title: 'Страница 404',
          link: './pages/error-not-found/index.html'
        },
        {
          title: 'Страница 500',
          link: './pages/error-server/index.html'
        },
      ],
    },
    '/pages/login/index.html': {
      title: 'Авторизация',
    },
    '/pages/sign-up/index.html': {
      title: 'Регистрация',
    },
    '/pages/messenger/index.html': {
      title: 'Чаты',
      chatsList: [
        {
          image: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/1_uid_669513da9d174.png',
          chatName: 'Андрей',
          messagePreview: 'Изображение',
          date: '10:49',
          unreadMessages: '2',
          isActive: true,
        },
        {
          image: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/2_uid_669513d93a8d7.png',
          chatName: 'Анастасия',
          messagePreview: '<span style="color: black;">Вы:</span> Огонь',
          date: '09:55',
          unreadMessages: null,
          isActive: false,
        },
        {
          image: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/3_uid_669513da47b86.png',
          chatName: 'Илья',
          messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...',
          date: '08:49',
          unreadMessages: '4',
          isActive: false,
        },
        {
          image: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/4_uid_669513d99d25f.png',
          chatName: 'тет-а-теты',
          messagePreview: 'И Human Interface Guidelines и Material рекомендуют...',
          date: 'Пн',
          unreadMessages: null,
          isActive: false,
        },
      ]
    },
    '/pages/profile/index.html': {
      title: 'Профиль',
      userName: 'Тимур',
      userAvatar: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/timur-avatar_uid_6695699e4ab9d.jpg',
      userInfoFields: [
        {
          label: 'Почта',
          value: 'timur@iskandarov.kz'
        },
        {
          label: 'Логин',
          value: 'Timur233'
        },
        {
          label: 'Имя',
          value: 'Тимур'
        },
        {
          label: 'Фамилия',
          value: 'Искандаров'
        },
        {
          label: 'Имя в чате',
          value: 'Timur233'
        },
        {
          label: 'Телефон',
          value: '+7 771 461 3215'
        },
      ]
    },
    '/pages/profile-change-data/index.html': {
      title: 'Редактировать информацию о пользователе',
      userAvatar: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/timur-avatar_uid_6695699e4ab9d.jpg',
      userInfoFields: [
        {
          id: 'email',
          name: 'email',
          label: 'Email',
          value: 'timur@iskandarov.kz',
          placeholder: 'Cообщите ваш email',
          prompt: '',
          hasError: false
        },
        {
          id: 'login',
          name: 'login',
          label: 'Логин',
          value: 'Timur233',
          placeholder: 'Введите логин',
          prompt: '',
          hasError: false
        },
        {
          id: 'first_name',
          name: 'first_name',
          label: 'Имя',
          value: 'Тимур',
          placeholder: 'Как вас зовут?',
          prompt: '',
          hasError: false
        },
        {
          id: 'second_name',
          name: 'second_name',
          label: 'Фамилия',
          value: 'Искандаров',
          placeholder: 'Как ваша фамилия?',
          prompt: '',
          hasError: false
        },
        {
          id: 'display_name',
          name: 'display_name',
          label: 'Имя в чате',
          value: 'Timur233',
          placeholder: 'Как ваше имя будет отображатся в чате?',
          prompt: '',
          hasError: false
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Телефон',
          value: '+7 771 461 3215',
          placeholder: 'Ваши цифры?',
          prompt: '',
          hasError: false
        },
      ]
    },
    '/pages/profile-change-password/index.html': {
      title: 'Изменить пароль',
      userAvatar: 'https://site.iskandarov.kz/storage/uploads/2024/07/15/timur-avatar_uid_6695699e4ab9d.jpg',
    },
    '/pages/error-not-found/index.html': {
      title: '404 - Вы потерялись',
    },
    '/pages/error-server/index.html': {
      title: '500 - Cервер лег, а ты иди',
    },
};

export default defineConfig({
  root: 'src', 
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/index.html'), 
        login: resolve(__dirname, './src/pages/login/index.html'), 
        signUp: resolve(__dirname, './src/pages/sign-up/index.html'), 
        messenger: resolve(__dirname, './src/pages/messenger/index.html'), 
        profile: resolve(__dirname, './src/pages/profile/index.html'), 
        profileChangeData: resolve(__dirname, './src/pages/profile-change-data/index.html'), 
        profileChangePassword: resolve(__dirname, './src/pages/profile-change-password/index.html'), 
        errorNotFound: resolve(__dirname, './src/pages/error-not-found/index.html'), 
        errorServer: resolve(__dirname, './src/pages/error-server/index.html'), 
      }
    },
    outDir: '../dist', 
    emptyOutDir: true, 
  },
  server: {
    open: '/', 
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
      context(pagePath) {
        return pageData[pagePath];
      },
    })
  ],
  publicDir: '../static',
});
