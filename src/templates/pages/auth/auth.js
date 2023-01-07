import templateApp from '../../app.hbs';
import '../../app.scss';

import './auth.scss';

import templateAuth from './auth.hbs';


import link from '../../ui/link/link';
import button from '../../ui/button/button';
import appForm from '../../ui/form/form.js';
import input from '../../ui/form/input/input.js';


console.log(123123);

const formItems = [
    input({
        id: 'login',
        textLabel: 'Логин',
        placeholder: 'Логин',
        type: 'text',
        errorMessage: 'неверный логин'
    }),
    input({
        textLabel: 'Пароль',
        placeholder: 'Пароль',
        type: 'password',
        // errorMessage: 'ошибка'
    }),
]


const formButtons = [
    button({
        id: '',
        className: '',
        onClick: alert,
        label: 'Авторизоваться'
    }),
    link({
        id: '',
        className: '',
        href: '/reg.html',
        label: 'Нет аккаунта?'
    })

];

export default authPage = templateAuth({
    authForm: appForm({
        attr: {},
        formTitle: 'Вход',
        formItems,
        formButtons,
        submit: alert
    })
})



document.body.innerHTML = templateApp({ sidebar: '', page: authPage });
