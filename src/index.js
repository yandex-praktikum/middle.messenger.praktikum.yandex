import templateApp from './app.hbs';

import './app.scss';
import link from './components/link/link.js';

let links = [
    '<h1>Список страниц:</h1>',
    '<nav class="app__nav">',
    link({
        href: "/auth.html",
        label: "Авторизация"
    }),
    link({
        href: "/reg.html",
        label: "Регистрация"
    }),
    link({
        href: "/profile.html",
        label: "Профиль"
    }),
    link({
        href: "/chat.html",
        label: "Чат"
    }),
    link({
        href: "/404.html",
        label: "404"
    }),
    link({
        href: "/500.html",
        label: "500"
    }),
    '</nav>'
];


document.body.innerHTML = templateApp({ page: `<div class="page__index">${links.join('')}</div>` });
