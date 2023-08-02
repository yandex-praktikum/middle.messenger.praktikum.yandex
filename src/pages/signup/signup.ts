import { Auth } from '@layout';
import { Fieldset, Form, Link } from '@components';
import { FormField } from '@models';
import {
	emailValidator,
	LOGIN_VALIDATORS,
	nameLettersValidator,
	PASSWORD_VALIDATORS,
	phoneNumberValidator,
	repeatValidator,
} from '@utilities';
import { Block } from '@services';
import { AuthController } from '@controllers';
import { LOGIN_PATH } from '@constants';
import './signup.css';

interface SuperProps {
  content: Auth;
}

interface SigninFormData {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	password: string;
	repeat: string;
}

const formFields: FormField[] = [
  {
		name: 'first_name',
		label: 'Имя',
		value: '',
		validators: [nameLettersValidator]
	},
  {
		name: 'second_name',
		label: 'Фамилия',
		value: '',
		validators: [nameLettersValidator]
	},
  {
		name: 'login',
		label: 'Логин',
		value: '',
		validators: LOGIN_VALIDATORS
	},
  {
		name: 'email',
		label: 'Почта',
		value: '',
		validators: [emailValidator]
	},
  {
		name: 'phone',
		label: 'Телефон',
		value: '',
		validators: [phoneNumberValidator]
	},
  {
		name: 'password',
		label: 'Пароль',
		type: 'password',
		value: '',
		validators: PASSWORD_VALIDATORS
	},
  {
		name: 'repeat',
		label: 'Пароль (еще раз)',
		type: 'password',
		value: '',
		validators: [repeatValidator('password')]
	}
];

export class SignInPage extends Block<SuperProps> {

  constructor() {
    const form = new Form<SigninFormData>({
			title: 'Регистрация',
      fields: formFields.map(field => new Fieldset(field)),
      buttonText: 'Зарегистироваться',
			link: new Link({
				attr: { href: LOGIN_PATH },
				text: 'Войти'
			}),
      onSendData: data => this.onSubmit(data)
    });

    const superProps: SuperProps = { content: new Auth({ form }) };

    super('div', 'signin', superProps);
  }

  onSubmit(formData: SigninFormData) {
		AuthController.signup(formData);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
