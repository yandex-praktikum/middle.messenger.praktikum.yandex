import { Block } from '@services';

import './input.css';

export type InputEvent = Event & { target: HTMLInputElement };

interface Props<T> {
  attr: {
    name: string;
    type?: 'text' | 'password' | 'file';
    value?: T;
    placeholder?: string;
    disabled?: boolean;
		accept?: string;
  };

	onFocus?(e: InputEvent): void;
	onBlur?(e: InputEvent): void;
	onChange?(e: InputEvent): void;
}

export class Input<T = string> extends Block<Props<T>> {

  constructor(props: Props<T>) {
    super('input', 'input', props);
	}

  getValue(): string {
    return (this.element as HTMLInputElement).value.trim();
  }

	resetState() {
		(this.element as HTMLInputElement).value = this.props.attr.value as string;
	}
}
