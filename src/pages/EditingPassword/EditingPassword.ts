import { Block, Store, StoreEvents } from "../../core/index";
import template from "./EditingPassword.tmp.pug";
import {
  EditingPasswordForm,
  FieldText,
  Button,
  Link,
} from "../../components/index";
import { AuthController } from "../../controllers";

export default class EditingPassword extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      baseURL: import.meta.env.VITE_BASE_URL,
      first_name: '-',
      userSettings: new EditingPasswordForm({
        baseURL: import.meta.env.VITE_BASE_URL,
        currentPassword: new FieldText({
          withId: true,
          title: 'Current password:',
          type: 'password',
          name: 'oldPassword',
          value: '',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
        newPassword: new FieldText({
          withId: true,
          title: 'New password:',
          type: 'password',
          name: 'newPassword',
          value: '',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
        repeatNewPassword: new FieldText({
          withId: true,
          title: 'Repeat new password:',
          type: 'password',
          name: 'repeatNewPassword',
          value: '',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
        errorText: '',
      }),
      saveBtn: new Button({
        className: 'link link--t-1',
        type: 'submit',
        form: 'userSettingsForm',
        text: 'Save password',
      }),
      linkToEditingSettings: new Link({
        href: '/editing-settings',
        text: 'Change settings',
      }),
      linkToSettings: new Link({
        href: '/settings',
        text: 'Profile page',
      }),
      linkToChats: new Link({
        href: '/messenger',
        text: 'Chats page',
      }),
    }

    super('div', newProps);

    AuthController.getUserInfo();

    Store
      .on(StoreEvents.UserUpdate, () => {
        const {
          user: {
            avatar,
            first_name,
          },
        } = Store.getState();

        this.setProps({
          avatar,
          first_name,
        })
      })
  }

  render() {
    return this.compile(template, this.props);
  }
}
