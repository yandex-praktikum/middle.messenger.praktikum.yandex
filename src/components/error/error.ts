import { Block } from '@services';

import './error.css';

interface Props {
	text: string;
}

export class Error extends Block<Props> {

	constructor(props: Props) {
		super('span', 'error-message', props);
	}

	render(): DocumentFragment {
		return this.compile(null, { text: this.props.text });
	}
}
