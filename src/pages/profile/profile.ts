import {
	emailValidator,
	getQueryParam,
	LOGIN_VALIDATORS,
	nameLettersValidator,
	PASSWORD_VALIDATORS,
	phoneNumberValidator,
	repeatValidator
} from '@utilities';
import { ArrowLink, Avatar, Button, Fieldset, Modal, ChangeAvatar } from '@components';
import { FormField, FormAccessor } from '@models';

import * as MOCK from '../../mock.json';

import { ProfileForm } from './components';
import ProfileTemplate from './profile.hbs';

import './profile.css';

interface SuperProps {
  avatar: Avatar;
  backLink: ArrowLink;
  backButton: Button;
	form: ProfileForm;
  isMainState: boolean;
	changeAvatarModal: Modal;
}

const infoFields: FormField[] = [
  {
		name: 'email',
		label: 'Почта',
		value: MOCK.profile.email,
		validators: [emailValidator]
	},
  {
		name: 'login',
		label: 'Логин',
		value: MOCK.profile.login,
		validators: LOGIN_VALIDATORS
	},
  {
		name: 'first_name',
		label: 'Имя',
		value: MOCK.profile.first_name,
		validators: [nameLettersValidator]
	},
  {
		name: 'second_name',
		label: 'Фамилия',
		value: MOCK.profile.second_name,
		validators: [nameLettersValidator]
	},
  { name: 'display_name', label: 'Имя в чате', value: MOCK.profile.display_name },
  {
		name: 'phone',
		label: 'Телефон',
		value: MOCK.profile.phone,
		validators: [phoneNumberValidator]
	}
];

const passwordFields: FormField[] = [
  { name: 'oldPassword', label: 'Старый пароль', value: MOCK.profile.password, type: 'password' },
  {
		name: 'newPassword',
		label: 'Новый пароль',
		value: '',
		type: 'password',
		validators: PASSWORD_VALIDATORS
	},
  {
		name: 'repeat',
		label: 'Повторите новый пароль',
		value: '',
		type: 'password',
		validators: [repeatValidator('newPassword')]
	}
];

export class ProfilePage extends FormAccessor<SuperProps, ProfileForm> {

  constructor() {
    const state = getQueryParam('state');
    const isMainState = state !== 'edit' && state !== 'password';

    const fields: FormField[] = [];

    switch (state) {
      case 'edit':
        fields.push(...infoFields);
        break;
      case 'password':
        fields.push(...passwordFields);
        break;
      default:
        fields.push(...infoFields.map(field => ({ ...field, disabled: true })));
    }

		const form = new ProfileForm({
			fields: fields.map(field => new Fieldset({ ...field, mode: 'horizontal' })),
			isMainState,
			onSubmit: e => this.onSubmit(e)
		});

    const superProps: SuperProps = {
      avatar: new Avatar({
				mode: 'big',
				hover: true,
				onClick: () => this.props.changeAvatarModal.show()
			}),
      backLink: new ArrowLink({
				attr: { href: '/profile' },
        label: 'Профиль',
        reversed: true
      }),
      backButton: new Button({
				attr: { role: 'link' },
        imgSrc: 'icons/arrow-left.svg',
        rounded: true,
        onClick: () => window.location.replace('/chats')
      }),
			form,
      isMainState,
			changeAvatarModal: new Modal({ content: new ChangeAvatar() })
    };

    super('div', 'profile', superProps);

		this.form = form;
  }

	onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!super.validateForm()) {
			return;
		}

		console.log('profile data:', this.formData);
	}

  render(): DocumentFragment {
    return this.compile(ProfileTemplate, {
			form: this.props.form,
			isMainState: this.props.isMainState
		});
  }
}
