import { Block } from '@services';
import { Button, Fieldset, Link } from '@components';
import { SETTINGS_PATH } from '@constants';
import { AuthController } from '@controllers';
import { isEqual } from '@utilities';

import ProfileFormTemplate from './form.hbs';
import './form.css';

interface Props<T> {
	fields: Fieldset[];
	isMainState: boolean;

	onSendData(formData: T): void;
}

interface SuperProps<T> extends Props<T> {
	saveButton: Button;
	changeLink: Link;
	passwordLink: Link;
	exitButton: Button;

	onSubmit(e: SubmitEvent): void;
}

type FormData<T extends Record<string, string>> = {
	[Key in keyof T]: string
}

export class ProfileForm<T extends FormData<T> = Record<string, any>> extends Block<SuperProps<T>> {

	initialFormData: Record<string, string> = {};

	get fields(): Fieldset[] {
		return this.props.fields;
	}

	get formData(): T {
		const formData: Record<string, string> = {};

		this.fields.forEach((field: Fieldset) => {
			formData[field.props.name] = field.getValue();
		});

		return formData as T;
	}

	constructor(props: Props<T>) {
		const superProps: SuperProps<T> = {
			...props,
			saveButton: new Button({
				attr: { type: 'submit' },
				className: 'profile-form__save-btn',
				text: 'Сохранить'
			}),
			changeLink: new Link({
				attr: { href: `${SETTINGS_PATH}?state=edit` },
				text: 'Изменить данные'
			}),
			passwordLink: new Link({
				attr: { href: `${SETTINGS_PATH}?state=password` },
				text: 'Изменить пароль'
			}),
			exitButton: new Button({
				attr: { type: 'button' },
				className: 'profile-form__exit-btn',
				text: 'Выйти',
				noStyles: true,
				onClick: () => AuthController.logout()
			}),
			onSubmit: e => this.onSubmit(e)
		};

		super('form', 'profile-form', superProps);

		this.fields.forEach(field => this.initialFormData[field.props.name] = field.getValue());
	}

	validateForm(): boolean {
		let isValid = true;

		this.fields.forEach((field: Fieldset) => {
			isValid = field.forceValidations() && isValid;
		});

		return isValid;
	}

	patchValue(value: T) {
		this.fields.forEach(field => {
			field.setValue(value[field.props.name as keyof T] ?? field.getValue());
			this.initialFormData[field.props.name] = field.getValue();
		});
	}

	onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!this.validateForm() || isEqual(this.formData, this.initialFormData)) {
			return;
		}

		this.fields.forEach(field => {
			this.initialFormData[field.props.name] = field.getValue();
		});

		this.props.onSendData(this.formData);
	}

	render(): DocumentFragment {
		return this.compile(ProfileFormTemplate, { isMainState: this.props.isMainState });
	}
}
