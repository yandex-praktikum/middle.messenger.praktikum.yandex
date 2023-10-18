import { Block } from "../../core/index";
import template from "./registration.tmp.pug";
import {
  RegistrationForm,
  FieldText,
  Button,
  Link,
} from "../../components/index";

const registratonForm = new RegistrationForm({
  withId: true,
  title: 'Sign up',
  fieldFirstName: new FieldText({
    withId: true,
    title: 'First name:',
    type: 'text',
    name: 'first_name',
    helpText: `
      латиница или кириллица, первая буква должна быть заглавной,
      без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    `,
    pattern: '(?=^[A-ZА-Я])[a-zA-Zа-яА-Я-]+$',
  }),
  fieldSecondName: new FieldText({
    withId: true,
    title: 'Second name:',
    type: 'text',
    name: 'second_name',
    helpText: `
      латиница или кириллица, первая буква должна быть заглавной,
      без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    `,
    pattern: '(?=^[A-ZА-Я])[a-zA-Zа-яА-Я-]+$',
  }),
  fieldEmail: new FieldText({
    withId: true,
    title: 'Email:',
    type: 'text',
    inputmode: 'email',
    name: 'email',
    helpText: `
      латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
      обязательно должна быть «собака» (@) и точка после неё,
      но перед точкой обязательно должны быть буквы
    `,
    pattern: '^[a-zA-Z\\d_-]+@[a-z]+\\.[a-z]{2,3}$',
  }),
  fieldPhone: new FieldText({
    withId: true,
    title: 'Phone:',
    type: 'text',
    inputmode: 'tel',
    name: 'phone',
    helpText: `
      от 10 до 15 символов, состоит из цифр, может начинается с плюса.
    `,
    pattern: '(?=^.{10,15}$)\\+?[0-9]+$',
  }),
  fieldLogin: new FieldText({
    withId: true,
    title: 'Login:',
    type: 'text',
    name: 'login',
    helpText: `
      от 3 до 20 символов, латиница, может содержать цифры,
      но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
    `,
    pattern: '(?=^.{3,20}$)[a-zA-Z_-]+[\\d_-a-zA-Z]*',
  }),
  fieldPassword: new FieldText({
    withId: true,
    title: 'Password:',
    type: 'password',
    name: 'password',
    value: '',
    helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
  }),
  sendBtn: new Button({
    className: 'btn  btn--w-100 btn--big',
    type: 'submit',
    text: 'Sign in',
  }),
  link: new Link({
    href: '/',
    text: 'Sign in',
  }),
  errorText: '',
})

export default class Registration extends Block {
  constructor(props?: object) {
    super('div', { ...props, registratonForm });
  }

  render() {
    return this.compile(template, this.props);
  }
}
