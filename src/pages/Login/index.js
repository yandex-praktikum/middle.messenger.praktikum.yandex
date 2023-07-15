import Handlebars from 'handlebars';
import {template} from './login.tmpl.js'
import Input from "../../components/Input/index.js";
import Button from "../../components/Button/index.js";
import './login.scss';

export const Login = (registration = false) => {
    if (registration) {
        return Handlebars.compile(template)({
            title: 'Регистрация',
            inputs: `
            ${Input({type: 'text', name: 'first_name', placeholder: 'Имя', required: true})}
            ${Input({type: 'text', name: 'second_name', placeholder: 'Фамилия', required: true})}
            ${Input({type: 'email', name: 'email', placeholder: 'E-mail', required: true})}
            ${Input({type: 'tel', name: 'phone', placeholder: 'phone', required: true})}
            ${Input({type: 'text', name: 'login', placeholder: 'Логин', required: true})}
            ${Input({type: 'password', name: 'password', placeholder: 'Пароль', required: true})}
            ${Input({type: 'password', name: 'repeat_password', placeholder: 'Повторите пароль', required: true})}`,
            button: Button({label: 'Войти'}),
            textLink: 'Уже есть аккаунт?',
            link: 'Войти',
            linkUrl: '/signin'
        });
    }
    return Handlebars.compile(template)({
        title: 'Вход',
        inputs: `
            ${Input({type: 'text', name: 'login', placeholder: 'Логин', required: true})}
            ${Input({type: 'password', name: 'password', placeholder: 'Пароль', required: true})}`,
        button: Button({label: 'Войти'}),
        textLink: 'Нет аккаунта?',
        link: 'Зарегистрироваться',
        linkUrl: '/signup'
    });
}
