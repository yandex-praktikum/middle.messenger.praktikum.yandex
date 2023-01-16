import templateApp from '../../app.hbs';
import '../../app.scss';


import templateReg from './reg.hbs';
import link from '../../components/link/link';
import button from '../../components/button/button';
import appForm from '../../components/form/form.js';
import input from '../../components/form/input/input.js';
import './reg.scss';


const formItems = [
    input({
        id: 'email',
        name:'email',
        textLabel: 'Почта',
        placeholder: 'Почта',
        type: 'email',
        errorMessage: ''
    }),
    input({
        id: 'login',
        name:'login',
        textLabel: 'Логин',
        placeholder: 'Логин',
        type: 'text',
        errorMessage: 'неверный логин'
    }),
    input({
        id: 'first_name',
        name:'first_name',
        textLabel: 'Имя',
        placeholder: 'Имя',
        type: 'text',
        errorMessage: ''
    }),
    input({
        id: 'second_name',
        name:'second_name',
        textLabel: 'Фамилия',
        placeholder: 'Фамилия',
        type: 'text',
        errorMessage: ''
    }),
    input({
        id: 'phone',
        name:'phone',
        textLabel: 'Телефон',
        placeholder: 'Телефон',
        type: 'tel',
        errorMessage: ''
    }),
    input({
        textLabel: 'Пароль',
        placeholder: 'Пароль',
        type: 'password',
        // errorMessage: 'ошибка'
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
        label: 'Зарегистрироваться'
    }),
    link({
        id: '',
        className: '',
        href: '/auth.html',
        label: 'Войти'
    })

];

export const regPage = templateReg({
    authForm: appForm({
        attr: {},
        formTitle: 'Регистрация',
        formItems,
        formButtons,
        submit: alert
    })
})


document.body.innerHTML = templateApp({ sidebar: '', page: regPage });
