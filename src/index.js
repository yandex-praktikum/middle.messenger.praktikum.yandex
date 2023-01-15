import templateFunction from './templates/app.hbs';

import './templates/app.scss';
import link from './templates/ui/link/link.js';

let links = [
    '<h1>Список страниц:</h1>',
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
];


document.body.innerHTML = templateFunction({ page: `<div class="page__index">${links.join('<br>')}</div>` });

