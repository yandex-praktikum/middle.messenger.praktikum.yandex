import signIn from '../../pages/signin.hbs';
import Handlebars from "handlebars";
import './signin.scss';
import Input from '../../components/Input/input.js';
import Footer from '../../components/Footer/footer.js';
import { onCustomEvent } from '../../utils/event.js';
import { profilesList } from '../../models/profiles.js';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Footer', Footer);

export default class SignIn {
    container;
    template;

    constructor(container) {
        this.container = container;
    }

    render() {
        const data = {
            title: 'Вход',
            inputs: [
                {
                    labelFor: "login",
                    label: "Логин",
                    id: "login",
                    name: "login",
                    placeholder: "Введите логин"
                },
                {
                    labelFor: "password",
                    label: "Пароль",
                    id: "password",
                    name: "password",
                    placeholder: "Введите пароль"
                },
            ],
            footer: {
                title: 'Войти',
                linkText: 'Нет аккаунта?',
                id: 'signIn',
                link: 'redirectSignUp'
            }
        };

        this.container.innerHTML = signIn(data);

        document.getElementById('footer').addEventListener('click', (event) => {
            const element = event.target.closest('.footer__action');
            const id = element?.dataset?.id;
            
            if (id === 'signIn') {
                let user = {};

                data.inputs.forEach(input => {
                    user[input.id] = document.getElementById(input.id).value;
                });

                const findProfile = profilesList.find(profile => profile.login === user.login);
                const error = document.getElementById('error__message');

                if (!findProfile || findProfile.password !== user.password) {
                    error.classList.add('error__message-visible');

                    return;
                }

                error.classList.remove('error__message-visible');
                onCustomEvent('profile');
            } else {
                onCustomEvent(id);
            }
        });
    }
}
