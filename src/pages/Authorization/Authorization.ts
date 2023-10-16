import { Block } from "../../core/index";
import template from "./Authorization.tmp.pug";
import {
  AuthorizationForm,
  FieldText,
  Button,
  Link,
} from "../../components/index";

const authForm = new AuthorizationForm({
  withId: true,
  title: 'Sign in',
  fieldLogin: new FieldText({
    withId: true,
    title: 'Login:',
    type: 'text',
    name: 'login',
    helpText: `
      от 3 до 20 символов, латиница, может содержать цифры,
      но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
    `,
    pattern: '(?=^.{3,20}$)[a-zA-Z_-]+[0-9_-a-zA-Z]*',
  }),
  fieldPassword: new FieldText({
    withId: true,
    title: 'Password:',
    type: 'password',
    name: 'password',
    value: '',
    helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*[0-9]).*',
  }),
  sendBtn: new Button({
    className: 'btn  btn--w-100 btn--big',
    type: 'submit',
    text: 'Sign in',
  }),
  link: new Link({
    href: '/sign-up',
    text: 'Sign up',
  }),
  errorText: '',
})

export default class Authorization extends Block {
  constructor(props?: object) {
    super('div', { ...props, authForm });
  }

  render() {
    return this.compile(template, this.props);
  }
}
