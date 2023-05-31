/* eslint-disable no-undef */
import Block, { TProps } from '../../classes/Block';
import Link from '../../components/link/link';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import templateProfile from './profile.hbs';
import avatarImg from '../../assets/icon/avatar_default.png';
import Input from '../../components/input/input';
import {
    EMAIL_REGEX, LOGIN_REGEX, FIRST_NAME_REGEX, SECOND_NAME_REGEX, PHONE_REGEX, PASSWORD_REGEX, DISPLAY_NAME_REGEX, onBlur, onFocus, onSubmit,
} from '../../utils/validation';
import './profile.scss';
import AuthController from '../../controlles/AuthController';
import { connect } from '../../utils/store';
import UsersController from '../../controlles/UsersController';
import { resourcesUrl } from '../../utils/config';
import { State } from '../../classes/Store';


class ProfilePage extends Block {
    constructor() {
        const formDataProfile = new Form({
            attr: {
                class: 'app__form form profile-form',
            },
            controller: UsersController.changeData.bind(UsersController),
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
                            this.viewListData();
                        },
                    },
                }),
            ],
        });
        const formPassProfile = new Form({
            attr: {
                class: 'app__form form profile-form',
            },
            controller: UsersController.changePassword.bind(UsersController),
            events: {
                focusin: onFocus,
                focusout: onBlur,
                submit: onSubmit,
            },
            items: [
                new Input({
                    ...inputDefaultProps,
                    name: 'oldPassword',
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
                    name: 'newPassword',
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
                        confirm: 'newPassword',
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
                            this.viewListData();
                        },
                    },
                }),
            ],
        });

        const propsPage = {
            type: 'view',
            attr: {
                class: 'app__profile-page page',
            },
            backlink,
            avatarImg,
            avatarUpload,
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
                            this.viewFormData();
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
                            this.viewFormPassword();
                        },
                    },
                }),
                new Button({
                    attr: {
                        class: 'btn btn-small',
                    },
                    text: 'Выйти',
                    events: {
                        click: AuthController.logout.bind(AuthController),
                    },
                }),
            ],
        };
        const { buttons } = propsPage;
        const props: TProps = {
            ...propsPage,
            buttons: '',
        };


        props.formDataProfile?.hide();
        props.formPassProfile?.hide();


        props.listDataProfile = {};
        buttons.forEach((item: Button) => {
            const id = item.id ?? '';
            props[id] = item;
            props.buttons += `<div data-id="${id}"></div>`;
        });
        super('main', props, templateProfile);
    }

    static getStateToProps(state: State): TProps {
        let props = {};
        if (state?.user) {
            props = {
                listDataProfile: state.user,
                avatarImg: resourcesUrl + state.user.avatar ?? avatarImg,
            };
        }
        return props;
    }

    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        Object.values(this.children.formDataProfile.children).forEach((item: Block) => {
            if (item instanceof Input) {
                if (_newProps.listDataProfile[item.props.name]) {
                    item.setProps({
                        value: _newProps.listDataProfile[item.props.name],
                    });
                }
            }
        });
        this.viewListData();
        return true;
    }

    viewListData(): void {
        const listDataProfile = this.getContent().querySelector('.list-data-profile') as HTMLElement;
        listDataProfile.style.display = '';
        this.children.formDataProfile.hide();
        this.children.formPassProfile.hide();
        const profileButtons = this.getContent().querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = '';
    }

    viewFormData(): void {
        const listDataProfile = this.getContent().querySelector('.list-data-profile') as HTMLElement;
        listDataProfile.style.display = 'none';
        this.children.formDataProfile.show();
        this.children.formPassProfile.hide();
        const profileButtons = this.getContent().querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    viewFormPassword(): void {
        const listDataProfile = this.getContent().querySelector('.list-data-profile') as HTMLElement;
        listDataProfile.style.display = 'none';
        this.children.formDataProfile.hide();
        this.children.formPassProfile.show();
        const profileButtons = this.getContent().querySelector('.profile__buttons') as HTMLElement;
        profileButtons.style.display = 'none';
    }

    render() {
        return this.compile(this.props);
    }
}

const backlink = new Link({
    attr: {
        href: '/messenger',
        class: 'btn arrowprev',
        text: '',
    },
    spa: true,
});
const avatarUpload = new Input({
    type: 'file',
    name: 'avatar',
    label: 'Поменять аватар',
    attr: {
        class: 'avatar-change',
    },
    events: {
        change: changeAvatar,
    },
});

const inputDefaultProps = {
    attr: {
        class: 'form__input label',
    },
    type: 'text',
    error: '',
};


export default connect(ProfilePage);

function changeAvatar(_self: Block, e: Event) {
    const data = new FormData();
    const elem = e.target as HTMLInputElement;
    if (elem.files) {
        data.append('avatar', elem.files[0]);
    }
    UsersController.changeAvatar(data);
}
