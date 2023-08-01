import { Auth } from '@layout';
import { Fieldset, Form } from '@components';
import { FormField, FormAccessor } from '@models';
import {
	emailValidator,
	LOGIN_VALIDATORS,
	nameLettersValidator,
	PASSWORD_VALIDATORS,
	phoneNumberValidator,
	repeatValidator,
} from '@utilities';

import './signin.css';

interface SuperProps {
  content: Auth;
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

export class SignInPage extends FormAccessor<SuperProps, Form> {

  constructor() {
    const form = new Form({
      fields: formFields.map(field => new Fieldset(field)),
      buttonText: 'Зарегистироваться',
      linkHref: '/login',
      linkText: 'Войти',
      onSubmit: e => this.onSubmit(e)
    });

    const superProps: SuperProps = {
      content: new Auth({ title: 'Регистрация', form })
    };

    super('div', 'signin', superProps);

    this.form = form;
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();

		if(!super.validateForm()) {
			return;
		}

		console.log('signin data:', this.formData);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
