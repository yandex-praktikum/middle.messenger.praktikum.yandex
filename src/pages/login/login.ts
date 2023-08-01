import { Auth } from '@layout';
import { Fieldset, Form } from '@components';
import { FormField, FormAccessor } from '@models';
import { LOGIN_VALIDATORS, PASSWORD_VALIDATORS } from '@utilities';

import './login.css';

interface SuperProps {
  content: Auth;
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

export class LoginPage extends FormAccessor<SuperProps, Form> {

  constructor() {
    const form = new Form({
      fields: formFields.map(field => new Fieldset(field)),
      buttonText: 'Авторизоваться',
      linkHref: '/signin',
      linkText: 'Нет аккаунта?',
      onSubmit: e => this.onSubmit(e)
    });

    const superProps: SuperProps = {
      content: new Auth({ title: 'Вход', form })
    };

    super('div', 'login', superProps);

    this.form = form;
  }

  onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!super.validateForm()) {
			return;
		}

		console.log('login data:', this.formData);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
