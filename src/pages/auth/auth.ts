import Block, { TProps } from '../../classes/Block';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import templateAuth from './auth.hbs';
import {
    LOGIN_REGEX,
    onBlur,
    onFocus,
    onSubmit,
    PASSWORD_REGEX,
} from '../../utils/validation';
import '../../assets/style/app.scss';
import './auth.scss';

export default class AuthPage extends Block {
    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    render() {
        return this.compile(this.props);
    }
}

const pageForm = new Form({
    formTitle: 'Вход',
    attr: {
        class: 'app__form form',
        action: '',
    },
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            attr: {
                class: 'form__input label',
            },
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            required: true,
            type: 'text',
            validation: {
                required: true,
                mask: LOGIN_REGEX,
                minlength: 3,
                maxlength: 20,
                validMsg: 'Логин должен содержать только буквы латиницы, без спецсимволов (кроме -,_)',
            },
            error: '',
        }),
        new Input({
            attr: {
                class: 'form__input label',
            },
            name: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEX,
                validMsg: 'Неверный пароль',
            },
            error: '',
        }),
    ],
    buttons: [
        new Button({
            text: 'Вход',
            attr: {
                type: 'submit',
                class: 'btn',
            },
        }),
        new Link({
            text: 'Ещё не зарегистрированы?',
            attr: {
                class: 'link',
                href: '/reg.html',
            },
        }),
    ],

});

const authPage = new AuthPage({
    attr: {
        class: 'app__auth-page',
    },
    form: pageForm,
}, templateAuth);

// eslint-disable-next-line no-undef
const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(authPage.getContent());
}
