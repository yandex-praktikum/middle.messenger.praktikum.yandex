import { Block } from "../../core/index";
import template from "./EditingSettings.tmp.pug";
import {
  EditingSettingsForm,
  FieldText,
  Button,
} from "../../components/index";

export default class EditingSettings extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      userName: 'User name',
      userSettings: new EditingSettingsForm({
        nickname: new FieldText({
          withId: true,
          title: 'Nickname:',
          type: 'text',
          name: 'display_name',
          value: 'userNickName',
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
          value: 'Firstname',
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
          value: 'Sirstname',
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
          value: 'test@test.ru',
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
          value: '+70000000000',
          helpText: `
            от 10 до 15 символов, состоит из цифр, может начинается с плюса.
          `,
          pattern: '(?=^.{10,15}$)\\+?[0-9]+$',
          tmp: 'setting',
        }),
      }),
      saveBtn: new Button({
        className: 'link',
        type: 'submit',
        form: 'userSettingsForm',
        text: 'Save settings',
      }),
    }

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
