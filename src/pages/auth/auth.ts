import templateAuth from './auth.hbs';
import link, { Link } from '../../components/link/link';
import button, { Button } from '../../components/button/button';
import appForm, { Form } from '../../components/form/form';
import input from '../../components/form/input/input';
import './auth.scss';
import '../../app.scss';
import Block, { TProps } from '../../classes/Block';
import Input from '../../components/input/input';

export default class AuthPage extends Block {
    constructor(props: TProps, templator: Function) {
        super('main', props, templator);
    }

    render() {
        return this.compile(this.props);
    }
}


const formItems: Array<string> = [
    input({
        id: 'login',
        name: 'login',
        textLabel: 'Логин',
        placeholder: 'Логин',
        type: 'text',
        errorMessage: 'неверный логин',
    }),
    input({
        id: 'password',
        name: 'password',
        textLabel: 'Пароль',
        placeholder: 'Пароль',
        type: 'password',
        // errorMessage: 'ошибка'
    }),
];


const formButtons: Array<string> = [
    button({
        id: '',
        className: '',
        label: 'Вход',
    }),
    link({
        id: '',
        className: '',
        href: '/reg.html',
        label: 'Ещё не зарегистрированы?',
    }),

];

window.testDataInput = {
    value: 1232,
};

const pageForm = new Form({
    propsOther: {
        formTitle: 'Вход',
        attr: {
            class: 'app__form',
            action: '',
        },
        events: {
            input: (self: Block, e) => {
                console.log(self);
                console.log(e);
                console.log(44);

            },
            focusin: onFocus,
            submit: onSubmit,
        },
    },
    items: [
        new Input({
            attr: {
                class: 'form__input',
            },
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
            required: true,
            type: 'text',
            validation: {
                required: true,
                mask: /^[A-Za-z][A-Za-z1-9\-_]{2,19}$/,
                minlength: 3,
                maxlength: 20,
                validMsg: 'Неверный логин',
            },
            error: '',
        }),
        new Input({
            attr: {
                class: 'form__input',
            },
            name: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            required: true,
            type: 'password',
            validation: true,
            error: 'неверный пароль',
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


// pageForm.setProps({
//     formTitle: 'Вход1',
//     attr: {
//         class: 'app__form',
//     },
//     events: {
//         focusin: onFocus,
//         // focusout: onBlur,
//         submit: onSubmit,
//     },
// })

console.log(pageForm);

const authPage = new AuthPage({
    attr: {
        class: 'app__auth-page',
    },
    // form: appForm({
    //     attr: {},
    //     formTitle: 'Вход',
    //     formItems,
    //     formButtons,
    // }),
    form: pageForm,
}, templateAuth);


const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(authPage.getContent());
}


export function onFocus(self: Block, e: Event) {
    if (!e.sourceCapabilities) return;
    const { value } = e.target;
    const component = self.children[e.target.dataset.idc];
    const error = self.validator(component.props.validation, value);
    component.setProps({
        value,
        error,
    });
    component.getContent().focus();
}

export function onBlur(self, e) {
    const { value } = e.target;
    const component = self.children[e.target.dataset.idc];
    const error = self.validator(component.props.validation, value);
    component.setProps({
        value,
        error,
    });
}

export function onSubmit(self:Block, e) {
    console.log(self.children);
    
}


// func getEventData

export function validator(validData: Record<string, string | number | RegExp>, value: string | number): string {
    let error = '';
    const { required = false, minlength = 0, maxlength = 9999, mask = '', validMsg = '' } = validData;
    if (required && !value) {
        error = 'Это обязательное поле';
    }
    if (mask && !mask.test(value)) {
        error = `Ошибка заполнения! ${validMsg}`;
    }
    if (value.length > maxlength || value.length < minlength) {
        error = `Неверная длина поля. Поле должно содержать от ${minlength} до ${maxlength} символов`;
    }
    if (!required && !value) error = '';
    console.log(error);
    return error;
}