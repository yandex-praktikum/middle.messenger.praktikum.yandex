import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import Form from '../../components/form';
import { Block } from '../../utils/block';
import template from './authorization.hbs';
import './authorization.less';
import { onSubmit } from '../../utils/on-submit';
import AuthController from '../../controllers/auth-controller';
import { ISigninData } from '../../utils/interfaces';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.form = new Form({
      name: 'Authorization',
      button: new Button({
        label: 'Sign in',
        className: 'main-button',
        type: 'submit',
        events: {
          click: (e: Event): void => {
            const data = onSubmit(e, 'validated-input');
            AuthController.signin(data as ISigninData);
          },
        },
      }),
      link: new Link({
        path: '/sign-up',
        text: 'Sign up',
      }),
      linkText: 'No account yet?',
      buttonsClass: 'buttons-login',
      inputs: [
        new Input({
          label: 'login',
          type: 'text',
          value: '',
          placeholder: 'login',
          name: 'login',
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
      ],
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
