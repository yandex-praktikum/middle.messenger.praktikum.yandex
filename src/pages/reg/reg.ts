/* eslint-disable no-undef */
import Block from '../../classes/Block';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import {
    onFocus,
    onBlur,
    onSubmit,
    LOGIN_REGEX,
    EMAIL_REGEX,
    FIRST_NAME_REGEX,
    SECOND_NAME_REGEX,
    PHONE_REGEX,
    PASSWORD_REGEX,
} from '../../utils/validation';
import { connect } from '../../utils/store';
import AuthController from '../../controlles/AuthController';
import templateReg from './reg.hbs';
import './reg.scss';

class RegPage extends Block {
    constructor() {
        const props = {
            attr: {
                class: 'app__reg-page',
            },
            form: pageForm,
        };
        super('main', props, templateReg);
    }

    render() {
        return this.compile(this.props);
    }
}

export default connect(RegPage);

const inputDefaultProps = {
    attr: {
        class: 'form__input label',
    },
    type: 'text',
    error: '',
};

const pageForm = new Form({
    formTitle: 'Регистрация',
    attr: {
        class: 'app__form form',
        action: '',
    },
    controller: AuthController.createUser.bind(AuthController),
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'email',
            label: 'Почта',
            placeholder: 'Почта',
            value: 'asdas@yandex.ru',
            required: true,
            validation: {
                required: true,
                mask: EMAIL_REGEX,
                validMsg: 'Почта введена неверно',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            value: 'dream',
            required: true,
            validation: {
                required: true,
                mask: LOGIN_REGEX,
                minlength: 3,
                maxlength: 20,
                validMsg: 'Логин должен содержать только буквы латиницы, без спецсимволов (кроме -,_)',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            value: 'Pa',
            required: true,
            validation: {
                required: true,
                mask: FIRST_NAME_REGEX,
                validMsg: 'Поле должно состаять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            value: 'Pa',
            required: true,
            validation: {
                required: true,
                mask: SECOND_NAME_REGEX,
                validMsg: 'Поле должно состаять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            // type: 'number',
            required: true,
            value: '+79991234567',
            validation: {
                required: true,
                mask: PHONE_REGEX,
                minlength: 10,
                maxlength: 15,
                validMsg: 'Поле должно состоять только из цифр и может начинаться с +',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            required: true,
            value: '1234567A',
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEX,
                minlength: 8,
                maxlength: 40,
                validMsg: 'Пароль должен содержать одну заглавную букву и цифру',
            },
        }),
        new Input({
            attr: {
                class: 'form__input label',
            },
            name: 'confirm_password',
            label: 'Повторите пароль',
            placeholder: 'Повторите пароль',
            value: '1234567A',
            required: true,
            type: 'password',
            validation: {
                required: true,
                confirm: 'password',
                validMsg: 'Пароли не совпадают',
            },
            error: '',
        }),
    ],
    buttons: [
        new Button({
            text: 'Зарегистрировать',
            attr: {
                type: 'submit',
                class: 'btn',
            },
        }),
        new Link({
            text: 'Войти',
            attr: {
                class: 'link',
                href: '/',
            },
            spa: true,
        }),
    ],

});
