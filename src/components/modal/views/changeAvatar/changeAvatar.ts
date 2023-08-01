import { Block } from '@services';
import { Button, Error, Input, InputEvent } from '@components';

import ChangeAvatarTemplate from './changeAvatar.hbs';

import './changeAvatar.css';

interface SuperProps {
	title: string;
	input: Input;
	file: File | null;
	button: Button;
	noFileError: Block | null;
}

export class ChangeAvatar extends Block<SuperProps> {

	get file() {
		return this.props.file;
	}

	constructor() {
		const superProps: SuperProps = {
			title: 'Загрузите файл',
			input: new Input({
				attr: { name: 'avatar', type: 'file', accept: 'image/*' },
				onChange: e => this.onFileSelected(e)
			}),
			file: null,
			button: new Button({ text: 'Поменять', onClick: () => this.saveFile()}),
			noFileError: null
		};

		super('div', 'change-avatar', superProps);
	}

	onFileSelected(e: InputEvent) {
		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];

		this.setProps({ title: 'Файл загружен', file, noFileError: null });
	}

	saveFile() {
		if (!this.file) {
			this.setProps({
				noFileError: new Error( { text: 'Нужно выбрать файл' })
			});
		}

		//...
	}

	render(): DocumentFragment {
		return this.compile(ChangeAvatarTemplate, {
			title: this.props.title,
			fileName: this.file?.name
		});
	}
}
