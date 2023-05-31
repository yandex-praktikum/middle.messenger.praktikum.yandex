/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import Link from '../../components/link/link';
import List from '../../components/list/list';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import templateProfile from './profile.hbs';
import avatarImg from '../../assets/icon/avatar_default.png';
import '../../assets/style/app.scss';
import './profile.scss';
import { exampleProfileData } from '../../../static/exampleData.json';
import Input from '../../components/input/input';
import {
    EMAIL_REGEX, LOGIN_REGEX, FIRST_NAME_REGEX, SECOND_NAME_REGEX, PHONE_REGEX, PASSWORD_REGEX, DISPLAY_NAME_REGEX, onBlur, onFocus, onSubmit,
} from '../../utils/validation';

type TProfileElement = {
    label: string,
    value: string | number
}
export default class ProfilePage extends Block {
    constructor(propsPage: TProps, templator: Function) {
        const { buttons, data } = propsPage;
        const props: TProps = {
            ...propsPage,
            buttons: '',
        };

        const dataListArray = Object.values(data).map((item: TProfileElement): string => `<span class="label">${item.label}</span><span class="value">${item.value}</span>`) ?? [];

        props.formDataProfile?.hide();
        props.formPassProfile?.hide();

        props.listDataProfile = new List({
            attr: {
                class: 'list',
            },
            items: dataListArray,
        });

        buttons.forEach((item: Button) => {
            const id = item._id ?? '';
            props[id] = item;
            props.buttons += `<div data-id="${id}"></div>`;
        });
        super('main', props, templator);
    }

    viewListData(): void {
        this.children.listDataProfile.show();
        this.children.formDataProfile.hide();
        this.children.formPassProfile.hide();
        const profileButtons = this._element.querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = '';
    }

    viewFormData(): void {
        this.children.listDataProfile.hide();
        this.children.formDataProfile.show();
        this.children.formPassProfile.hide();
        const profileButtons = this._element.querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    viewFormPassword(): void {
        this.children.listDataProfile.hide();
        this.children.formDataProfile.hide();
        this.children.formPassProfile.show();
        const profileButtons = this._element.querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    render() {
        return this.compile(this.props);
    }
}

const backlink = new Link({
    attr: {
        href: '/index.html',
        class: 'btn arrowprev',
        text: '',
    },
});
const avatarUpload = new Input({
    type: 'file',
    name: 'avatar',
    label: 'Поменять аватар',
    attr: {
        class: 'avatar-change',
    },
});

let profilePage: ProfilePage;


const inputDefaultProps = {
    attr: {
        class: 'form__input label',
    },
    type: 'text',
    error: '',
};
const formDataProfile = new Form({
    attr: {
        class: 'app__form form',
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'email',
            label: 'Почта',
            placeholder: 'Почта',
            required: true,
            validation: {
                required: true,
                mask: EMAIL_REGEX,
                minlength: 3,
                maxlength: 20,
                validMsg: 'Почта введена неверно',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'login',
            label: 'Логин',
            placeholder: 'Логин',
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
            required: true,
            validation: {
                required: true,
                mask: SECOND_NAME_REGEX,
                validMsg: 'Поле должно состаять только из букв, первая заглавная',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'display_name',
            label: 'Имя в чате',
            placeholder: 'Имя в чате',
            required: true,
            validation: {
                required: true,
                mask: DISPLAY_NAME_REGEX,
                validMsg: 'Поле не может содержать спецсимволы',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Телефон',
            // type: 'number',
            required: true,
            validation: {
                required: true,
                mask: PHONE_REGEX,
                minlength: 10,
                maxlength: 15,
                validMsg: 'Поле должно состоять только из цифр и может начинаться с +',
            },
        }),
    ],
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    buttons: [
        new Button({
            attr: {
                class: 'btn',
                type: 'submit',
            },
            text: 'Сохранить',
        }),
        new Button({
            attr: {
                class: 'btn',
                type: 'button',
            },
            text: 'Отменить',
            events: {
                click: () => {
                    profilePage.viewListData();
                },
            },
        }),
    ],
});
const formPassProfile = new Form({
    attr: {
        class: 'app__form form',
    },
    events: {
        focusin: onFocus,
        focusout: onBlur,
        submit: onSubmit,
    },
    items: [
        new Input({
            ...inputDefaultProps,
            name: 'old_password',
            label: 'Старый пароль',
            placeholder: 'Старый пароль',
            required: true,
            type: 'password',
            validation: {
                required: true,
                mask: PASSWORD_REGEX,
                minlength: 8,
                maxlength: 40,
                validMsg: 'Неверный пароль',
            },
        }),
        new Input({
            ...inputDefaultProps,
            name: 'password',
            label: 'Новый пароль',
            placeholder: 'Новый пароль',
            required: true,
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
            label: 'Повторите новый пароль',
            placeholder: 'Повторите новый пароль',
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
            attr: {
                class: 'btn',
                type: 'submit',
            },
            text: 'Сохранить',
        }),
        new Button({
            attr: {
                class: 'btn',
                type: 'button',
            },
            text: 'Отменить',
            events: {
                click: () => {
                    profilePage.viewListData();
                },
            },
        }),
    ],
});

Object.values(formDataProfile.children).forEach((item: Block) => {
    if (item instanceof Input) {
        if (exampleProfileData[item.props.name].value) {
            item.setProps({
                value: exampleProfileData[item.props.name].value,
            });
        }
    }
});


profilePage = new ProfilePage({
    type: 'view',
    attr: {
        class: 'app__profile-page page',
    },
    backlink,
    avatarImg,
    avatarUpload,
    data: exampleProfileData,
    formDataProfile,
    formPassProfile,
    buttons: [
        new Button({
            attr: {
                class: 'btn btn-small',
            },
            text: 'Изменить данные',
            events: {
                click: () => {
                    profilePage.viewFormData();
                },
            },
        }),
        new Button({
            attr: {
                class: 'btn btn-small',
            },
            text: 'Изменить пароль',
            events: {
                click: () => {
                    profilePage.viewFormPassword();
                },
            },
        }),
        new Button({
            attr: {
                class: 'btn btn-small',
            },
            text: 'Выйти',
        }),
    ],
}, templateProfile);

const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(profilePage.getContent());
}
