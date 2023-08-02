import {
	emailValidator,
	getAuthUser,
	getAuthUserAvatar,
	getQueryParam,
	LOGIN_VALIDATORS,
	nameLettersValidator,
	PASSWORD_VALIDATORS,
	phoneNumberValidator,
	repeatValidator
} from '@utilities';
import { ArrowLink, Avatar, Button, Fieldset, Modal, ChangeAvatar } from '@components';
import { FormField } from '@models';
import { ConnectBlock, Router, Store } from '@services';
import { CHATS_PATH, SETTINGS_PATH } from '@constants';
import { UserController } from '@controllers';

import { ProfileForm } from './components';
import ProfileTemplate from './profile.hbs';

import './profile.css';

interface SuperProps {
  avatar: Avatar;
  backLink: ArrowLink;
  backButton: Button;
	form: ProfileForm;
  isMainState: boolean;
}

interface UserFormData {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
}

interface PasswordFormData {
	oldPassword: string;
	newPassword: string;
}

type PageState = 'main' | 'edit' | 'password';

const infoFields: FormField[] = [
  {
		name: 'email',
		label: 'Почта',
		value: '',
		validators: [emailValidator]
	},
  {
		name: 'login',
		label: 'Логин',
		value: '',
		validators: LOGIN_VALIDATORS
	},
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
  { name: 'display_name', label: 'Имя в чате', value: '' },
  {
		name: 'phone',
		label: 'Телефон',
		value: '',
		validators: [phoneNumberValidator]
	}
];

const passwordFields: FormField[] = [
  { name: 'oldPassword', label: 'Старый пароль', value: '', type: 'password' },
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

function getPageState() {
	const state = (getQueryParam('state') || 'main') as PageState;

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

	return { state, fields };
}

export class ProfilePage extends ConnectBlock<SuperProps> {

	changeAvatarModal = new Modal({
		content: new ChangeAvatar( { onSaveFile: this.changeAvatar.bind(this) })
	});

	private readonly _pageState: PageState;

	get form(): ProfileForm {
		return this.props.form;
	}

  constructor() {
		const { state, fields } = getPageState();
		const isMainState = state !== 'edit' && state !== 'password';

		const form = new ProfileForm<UserFormData | PasswordFormData>({
			fields: fields.map(field => new Fieldset({ ...field, mode: 'horizontal' })),
			isMainState,
			onSendData: data => this.changeProfile(data)
		});

		form.patchValue(Store.getState(getAuthUser)!);

    const superProps: SuperProps = {
      avatar: new Avatar({
				mode: 'big',
				imgSrc: Store.getState(getAuthUserAvatar),
				hover: state === 'edit',
				onClick: () => {
					state === 'edit' && this.changeAvatarModal.show();
				}
			}),
      backLink: new ArrowLink({
				attr: { href: SETTINGS_PATH },
        label: 'Профиль',
        reversed: true
      }),
      backButton: new Button({
				attr: { role: 'link' },
        imgSrc: 'icons/arrow-left.svg',
        rounded: true,
        onClick: () => Router.go(CHATS_PATH)
      }),
			form,
      isMainState
    };

    super('div', 'profile', superProps, getAuthUserAvatar);

		this._pageState = state;
  }

	onStoreUpdated(avatar: string) {
		this.props.avatar.setProps({ imgSrc: avatar });
	}

	changeAvatar(file: File) {
		const data = new FormData();
		data.append('avatar', file);

		UserController.updateUserAvatar(data)
			.then(() => this.changeAvatarModal.hide());
	}

	changeProfile(formData: UserFormData | PasswordFormData) {
		if (this._pageState === 'password') {
			UserController.updateUserPassword(formData as PasswordFormData);
		} else {
			UserController.updateUserData(formData as UserFormData);
		}
	}

	componentWillUnmount() {
		this.changeAvatarModal.componentWillUnmount();
	}

	render(): DocumentFragment {
    return this.compile(ProfileTemplate, {
			form: this.form,
			isMainState: this.props.isMainState,
			name: Store.getState(getAuthUser)?.first_name
		});
  }
}
