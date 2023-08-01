import { Block } from '@services';

import ActionListTemplate from './actionList.hbs';
import './actionList.css';

interface Props {
	items: Block[];
}

export class ActionList extends Block<Props> {

	constructor(props: Props) {
		super('div', 'actions-list', props);
	}

	render(): DocumentFragment {
		return this.compile(ActionListTemplate);
	}
}
