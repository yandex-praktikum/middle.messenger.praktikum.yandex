import { Block, Store, StoreEvents } from "../../core/index";
import template from "./EditingSettings.tmp.pug";
import {
  EditingSettingsForm,
  FieldText,
  Button,
  Link,
} from "../../components/index";
import { AuthController } from "../../controllers";

export default class EditingSettings extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      withId: true,
      userName: '-',
      baseURL: import.meta.env.VITE_BASE_URL,
      userSettings: new EditingSettingsForm({
        nickname: new FieldText({
          withId: true,
          title: 'Nickname:',
          type: 'text',
          name: 'display_name',
          value: '-',
          helpText: `
            латиница или кириллица, без пробелов и без цифр,
            нет спецсимволов (допустим только дефис)
          `,
          pattern: '^[a-zA-Zа-яА-Я-]+$',
          tmp: 'setting',
        }),
        firstName: new FieldText({
          withId: true,
          title: 'First name:',
          type: 'text',
          name: 'first_name',
          value: '-',
          helpText: `
            латиница или кириллица, первая буква должна быть заглавной,
            без пробелов и без цифр, нет спецсимволов (допустим только дефис)
          `,
          pattern: '(?=^[A-ZА-Я])[a-zA-Zа-яА-Я-]+$',
          tmp: 'setting',
        }),
        secondName: new FieldText({
          withId: true,
          title: 'Second name:',
          type: 'text',
          name: 'second_name',
          value: '-',
          helpText: `
            латиница или кириллица, первая буква должна быть заглавной,
            без пробелов и без цифр, нет спецсимволов (допустим только дефис)
          `,
          pattern: '(?=^[A-ZА-Я])[a-zA-Zа-яА-Я-]+$',
          tmp: 'setting',
        }),
        email: new FieldText({
          withId: true,
          title: 'Email:',
          type: 'text',
          inputmode: 'email',
          name: 'email',
          value: '-',
          helpText: `
            латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
            обязательно должна быть «собака» (@) и точка после неё,
            но перед точкой обязательно должны быть буквы
          `,
          pattern: '^[a-zA-Z\\d_-]+@[a-z]+\\.[a-z]{2,3}$',
          tmp: 'setting',
        }),
        phone: new FieldText({
          withId: true,
          title: 'Phone:',
          type: 'text',
          inputmode: 'tel',
          name: 'phone',
          value: '-',
          helpText: `
            от 10 до 15 символов, состоит из цифр, может начинается с плюса.
          `,
          pattern: '(?=^.{10,15}$)\\+?[0-9]+$',
          tmp: 'setting',
        }),
        errorText: '',
      }),
      saveBtn: new Button({
        className: 'link link--t-1',
        type: 'submit',
        form: 'userSettingsForm',
        text: 'Save settings',
      }),
      linkChangePass: new Link({
        href: '/editing-password',
        text: 'Change password',
      }),
      linkProfilePage: new Link({
        href: '/settings',
        text: 'Profile page',
      }),
    }

    super('div', newProps);

    AuthController.getUserInfo();

    Store
      .on(StoreEvents.UserUpdate, () => {
        const {
          user: {
            avatar,
            display_name,
            first_name,
            second_name,
            email,
            phone,
          },
        } = Store.getState();
        const {
          nickname: nicknameField,
          firstName: firstNameField,
          secondName: secondNameField,
          email: emailField,
          phone: phoneField,
        } = this.children.userSettings.children;

        if (display_name) {
          nicknameField.setProps({
            value: display_name,
          })
        }

        if (first_name) {
          this.setProps({
            avatar,
            userName: first_name,
          })

          firstNameField.setProps({
            value: first_name,
          })
        }

        if (second_name) {
          secondNameField.setProps({
            value: second_name,
          })
        }

        if (email) {
          emailField.setProps({
            value: email,
          })
        }

        if (phone) {
          phoneField.setProps({
            value: phone,
          })
        }
      })
  }

  render() {
    return this.compile(template, this.props);
  }
}
