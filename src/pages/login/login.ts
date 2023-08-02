import { Auth } from '@layout';
import { Fieldset, Form, Link } from '@components';
import { FormField } from '@models';
import { LOGIN_VALIDATORS, PASSWORD_VALIDATORS } from '@utilities';
import { Block } from '@services';
import { AuthController } from '@controllers';
import { SIGNUP_PATH } from '@constants';

import './login.css';

interface SuperProps {
  content: Auth;
}

interface LoginFormData {
	login: string;
	password: string;
}

const formFields: FormField[] = [
  {
		name: 'login',
		label: 'Логин',
		value: '',
		validators: LOGIN_VALIDATORS
	},
  {
		name: 'password',
		label: 'Пароль',
		type: 'password',
		value: '',
		validators: PASSWORD_VALIDATORS
	}
];

export class LoginPage extends Block<SuperProps> {

  constructor() {
    const form = new Form<LoginFormData>({
			title: 'Вход',
      fields: formFields.map(field => new Fieldset(field)),
      buttonText: 'Авторизоваться',
			link: new Link({
				attr: { href: SIGNUP_PATH },
				text: 'Нет аккаунта?'
			}),
      onSendData: data => this.onSubmit(data)
    });

    const superProps: SuperProps = { content: new Auth({ form }) };

    super('div', 'login', superProps);
  }

  onSubmit(formData: LoginFormData) {
		AuthController.signin(formData);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
