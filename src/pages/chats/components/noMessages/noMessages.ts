import { Block } from '@services';

import NoMessagesTemplate from './noMessages.hbs';
import './noMessages.css';

export class NoMessages extends Block {

	constructor() {
		super('div', 'no-messages', {});
	}

	render(): DocumentFragment {
		return this.compile(NoMessagesTemplate);
	}
}
