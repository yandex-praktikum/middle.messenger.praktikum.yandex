import { Block } from '@services';
import { FormField } from '@models';
import { emitModalClick, requiredValidator } from '@utilities';
import { ChatsController } from '@controllers';

import { Form } from '../../form/form';
import { Fieldset } from '../../fieldset/fieldset';

interface SuperProps {
	content: Block;
}

interface CreateChatFormData {
	title: string;
}

const createChatFields: FormField[] = [
	{
		name: 'title',
		label: 'Название',
		value: '',
		validators: [requiredValidator]
	}
];

export class CreateChat extends Block<SuperProps> {

	constructor() {
		const form = new Form<CreateChatFormData>({
			title: 'Создать чат',
			fields: createChatFields.map(field => new Fieldset(field)),
			buttonText: 'Создать',
			onSendData: data => this.onSubmit(data)
		});

		const superProps: SuperProps = { content: form };

		super('div', 'create-chat', superProps);
	}

	onSubmit(formData: CreateChatFormData) {
		ChatsController.createChat(formData).then(emitModalClick(this.element));
	}

	render(): DocumentFragment {
		return this.compile();
	}
}
