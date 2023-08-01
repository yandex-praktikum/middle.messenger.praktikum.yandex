import { Block } from '@services';
import { Form } from '@components';

import UserActionTemplate from './userAction.hbs';
import './userAction.css';

interface Props {
	title: string;
	form: Form;
}

export class UserAction extends Block<Props> {

	constructor(props: Props) {
		super('div', 'user-action', props);
	}

	render(): DocumentFragment {
		return this.compile(UserActionTemplate, { title: this.props.title });
	}
}
