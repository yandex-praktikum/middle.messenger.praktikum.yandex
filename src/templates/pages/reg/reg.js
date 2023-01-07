import templateReg from './reg.hbs';
import link from '../../ui/link/link';
import button from '../../ui/button/button';
import appForm from '../../ui/form/form.js';
import input from '../../ui/form/input/input.js';
import './reg.scss';


const formItems = [
    input({
        id: 'email',
        textLabel: 'Почта',
        placeholder: 'Почта',
        type: 'email',
        errorMessage: ''
    }),
    input({
        id: 'login',
        textLabel: 'Логин',
        placeholder: 'Логин',
        type: 'text',
        errorMessage: 'неверный логин'
    }),
    input({
        id: 'name',
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
        href: '/',
        label: 'Войти'
    })

];

export default authPage = templateReg({
    authForm: appForm({
        attr: {},
        formTitle: 'Регистрация',
        formItems,
        formButtons,
        submit: alert
    })
})