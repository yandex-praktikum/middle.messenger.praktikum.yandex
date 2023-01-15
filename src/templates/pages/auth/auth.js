import templateApp from '../../app.hbs';
import '../../app.scss';


import templateAuth from './auth.hbs';
import link from '../../ui/link/link';
import button from '../../ui/button/button';
import appForm from '../../ui/form/form.js';
import input from '../../ui/form/input/input.js';
import './auth.scss';



const formItems = [
    input({
        id: 'login',
        name:'login',
        textLabel: 'Логин',
        placeholder: 'Логин',
        type: 'text',
        errorMessage: 'неверный логин'
    }),
    input({
        id: 'password',
        name:'password',
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
        label: 'Вход'
    }),
    link({
        id: '',
        className: '',
        href: '/reg.html',
        label: 'Ещё не зарегистрированы?'
    })

];

export const authPage = templateAuth({
    authForm: appForm({
        attr: {},
        formTitle: 'Вход',
        formItems,
        formButtons,
        submit: alert
    })
})



document.body.innerHTML = templateApp({ sidebar: '', page: authPage });
