import { Block } from '@services';
import { Button, Fieldset } from '@components';

import ProfileFormTemplate from './form.hbs';
import './form.css';

interface Props {
	fields: Fieldset[];
	isMainState: boolean;

	onSubmit(e: SubmitEvent): void;
}

interface SuperProps extends Omit<Props, 'onSubmit'> {
	button: Button;
}

export class ProfileForm extends Block<SuperProps> {

	constructor(props: Props) {
		const superProps: SuperProps = {
			...props,
			button: new Button({ attr: { type: 'submit' }, text: 'Сохранить' })
		};

		super('form', 'profile-form', superProps);
	}

	render(): DocumentFragment {
		return this.compile(ProfileFormTemplate, { isMainState: this.props.isMainState });
	}
}
