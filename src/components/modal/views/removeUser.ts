import { Block } from '@services';
import { FormAccessor, FormField } from '@models';
import { requiredValidator } from '@utilities';
import { UserAction } from '@layout';

import { Form } from '../../form/form';
import { Fieldset } from '../../fieldset/fieldset';

interface SuperProps {
	content: Block;
}

const removeUserFields: FormField[] = [
	{
		name: 'login',
		label: 'Логин',
		value: '',
		validators: [requiredValidator]
	}
];

export class RemoveUser extends FormAccessor<SuperProps, Form> {

	constructor() {
		const form = new Form({
			fields: removeUserFields.map(field => new Fieldset(field)),
			buttonText: 'Удалить',
			onSubmit: e => this.onSubmit(e)
		});

		const superProps: SuperProps = {
			content: new UserAction({
				title: 'Удалить пользователя',
				form
			})
		};

		super('div', 'remove-user', superProps);

		this.form = form;
	}

	onSubmit(e: SubmitEvent) {
		e.preventDefault();

		if(!super.validateForm()) {
			return;
		}

		console.log('user login:', this.formData);
	}

	render(): DocumentFragment {
		return this.compile();
	}
}
