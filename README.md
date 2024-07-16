[![Netlify Status](https://api.netlify.com/api/v1/badges/2a668cd5-3654-4c56-a540-19a633e37d11/deploy-status)](https://app.netlify.com/sites/praktikum-timur233/deploys)



## Проектная работа 1-й спринт

Ссылка на развернутое приложение: https://incandescent-madeleine-05611b.netlify.app/

Ссылка на макет Figma: https://www.figma.com/design/oTk9ZR7RWDP9qwCUY03H1q/Practicum-sprint-1?node-id=0-1&t=opYGE62FZeSNiRjx-1

## Описание

Макет отрисовал отталкиваясь от представленного макета на курсе и собственных наработок.

Отверстал все страницы по макету, на главную добавил список ссылок на все страницы для удобной навигации. По возможности старался вынасить некоторые блоки, которые возможно будут использоваться где-то еще в проекте в отдельные компоненты. 

Подключил шаблонизатор Handlebars. Так как я использовал подход при котором компиляция и рендеринг происходит на сервере, пришлось разместить все компоненты сайта в одной папке.

## Структура проекта

```bash
project-root/
│
├── src/
│   ├── components/
│   │   ├── avatar.hbs
│   │   ├── button.hbs
│   │   ├── change-avatar.hbs
│   │   ├── chat-item.hbs
│   │   ├── error-message.hbs
│   │   ├── form-group.hbs
│   │   └── search-chats.hbs
│   ├── pages/
│   │   ├── error-not-found
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.scss
│   │   ├── error-server
│   │   ├── login
│   │   ├── messenger
│   │   ├── profile
│   │   ├── profile-change-data
│   │   ├── profile-change-password
│   │   └── sign-up
│   ├── index.html
│   ├── style.scss
│   └── main.js
│
├── static/
│   ├── assets/
│   │   └── icons.svg
│   └── favicon.png
│
├── dist/
├── node_modules/
│
├── README.md
├── .gitignore
├── netlify.toml
├── vite.config.js
├── package-lock.json
└── package.json
```

## Стек

- ViteJS
- Handlebars
- SCSS
- SVG

## Установка проекта

```bash
npm install
```

## Основные команды

```bash
npm run dev — запуск версии для разработчика
npm run start — запуск проекта
npm run build — сборка стабильной версии
```