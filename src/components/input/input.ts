import { Block } from '@services';

import './input.css';

export type InputEvent = Event & { target: HTMLInputElement };

interface Props {
  attr: {
    name: string;
    type?: 'text' | 'password' | 'file' | 'checkbox';
    value?: string;
		checked?: boolean;
    placeholder?: string;
    disabled?: boolean;
		accept?: string;
  };

	onFocus?(e: InputEvent): void;
	onBlur?(e: InputEvent): void;
	onChange?(e: InputEvent): void;
	onKeyUp?(e: KeyboardEvent): void;
}

export class Input extends Block<Props> {

  constructor(props: Props) {
    super('input', 'input', props);
	}

  getValue(): string {
    return (this.element as HTMLInputElement).value.trim();
  }

	setValue(value: string): string {
		return (this.element as HTMLInputElement).value = value;
	}

	resetState() {
		(this.element as HTMLInputElement).value = this.props.attr.type !== 'file'
			? (this.props.attr.value as string)
			: '';
	}
}
