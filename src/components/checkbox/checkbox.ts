import { Block } from '@services';
import { Input, InputEvent } from '@components';

import CheckboxTemplate from './checkbox.hbs';
import './checkbox.css';

interface Props {
	text: string;
	checked?: boolean;
	disabled?: boolean;

	onChecked(): void;

	onUnChecked(): void;
}

interface SuperProps extends Props {
	input: Input;
}

export class Checkbox extends Block<SuperProps> {

	constructor(props: Props) {
		const superProps: SuperProps = {
			...props,
			input: new Input({
				attr: {
					name: 'checkbox',
					type: 'checkbox',
					checked: props.checked || undefined,
					disabled: props.disabled || undefined
				},
				onChange: e => this.onChange(e)
			})
		};

		super('div', 'checkbox', superProps);
	}

	onChange(e: InputEvent) {
		e.target.checked ? this.props.onChecked() : this.props.onUnChecked();
	}

	render() {
		return this.compile(CheckboxTemplate, {
			text: this.props.text
		});
	}
}
