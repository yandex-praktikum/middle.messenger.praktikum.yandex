import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import Form from '../../components/form';
import { Block } from '../../utils/block';
import template from './registration.hbs';
import './registration.less';
import { onSubmit } from '../../utils/on-submit';
import AuthController from '../../controllers/auth-controller';
import { ISignupData } from '../../utils/interfaces';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.form = new Form({
      name: 'Registration',
      button: new Button({
        label: 'Registration',
        className: 'main-button',
        events: {
          click: (e: Event): void => {
            const data = onSubmit(e, 'validated-input');
            AuthController.signup(data as ISignupData);
          },
        },
      }),
      link: new Link({
        path: '/',
        text: 'Log in',
      }),
      linkText: 'Already have an account?',
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
