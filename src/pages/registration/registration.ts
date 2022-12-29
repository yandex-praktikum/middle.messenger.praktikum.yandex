import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/Link';
import Form from '../../components/Form';
import { Block } from '../../utils/Block';
import template from './registration.hbs';
import './registration.less';
import { onSubmit } from '../../utils/OnSubmit';
import AuthController from '../../controllers/AuthController';
import { ISignupData } from '../../utils/Interfaces';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.form = new Form({
      name: 'Registration',
      button: new Button({
        label: 'Register',
        events: {
          click: (e: Event): void => {
            const data = onSubmit(e, 'validated-input');
            AuthController.signup(data as ISignupData);
          },
        },
      }),
      link: new Link({
        path: '/',
        text: 'Log in here',
      }),
      linkText: 'Already with us? ',
      buttonsClass: 'buttons-registration',
      inputs: [
        new Input({
          label: 'email',
          type: 'text',
          value: '',
          placeholder: 'email',
          name: 'email',
          className: 'validated-input',
        }),
        new Input({
          label: 'login',
          type: 'text',
          value: '',
          placeholder: 'login',
          name: 'login',
          className: 'validated-input',
        }),
        new Input({
          label: 'first name',
          type: 'text',
          value: '',
          placeholder: 'first name',
          name: 'first_name',
          className: 'validated-input',
        }),
        new Input({
          label: 'second name',
          type: 'text',
          value: '',
          placeholder: 'second name',
          name: 'second_name',
          className: 'validated-input',
        }),
        new Input({
          label: 'phone',
          type: 'text',
          value: '',
          placeholder: 'phone',
          name: 'phone',
          className: 'validated-input',
        }),
        new Input({
          label: 'password',
          type: 'password',
          value: '',
          placeholder: 'password',
          name: 'password',
          className: 'validated-input',
        }),
        new Input({
          label: 'password',
          type: 'password',
          value: '',
          placeholder: 'repeat password',
          name: 'password',
          className: 'validated-input',
        }),
      ],
    });
  }

  render() {
    return this.compile(template, {});
  }
}
