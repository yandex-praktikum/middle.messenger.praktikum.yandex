import { Block, Store } from '@services';
import {
	emitModalClick, getAuthUser, getSelectedChatId
} from '@utilities';
import { ChatsController } from '@controllers';

import { Button } from '../../../button/button';
import { Checkbox } from '../../../checkbox/checkbox';
import { Error } from '../../../error/error';

import RemoveUserTemplate from './removeUser.hbs';

import './removeUser.css';

interface SuperProps {
	title: string;
	checkboxes: Checkbox[];
	deleteButton: Button;
	noUsersError: Error | null;
}

export class RemoveUser extends Block<SuperProps> {

	chatId = Store.getState(getSelectedChatId)!;
	selectedUserIds: number[] = [];

	currentUser = Store.getState(getAuthUser);

	constructor() {
		const superProps: SuperProps = {
			title: 'Удалить пользователей',
			checkboxes: [],
			deleteButton: new Button({
				text: 'Удалить',
				onClick: () => this.removeUsers()
			}),
			noUsersError: null
		};

		super('div', 'remove-user', superProps);
	}

	removeUsers() {
		if (!this.selectedUserIds.length) {
			this.setProps({ noUsersError: new Error({ text: 'Необходимо выбрать пользователей' })});
			return;
		}

		ChatsController.deleteUsersFromChat({ users: this.selectedUserIds, chatId: this.chatId })
			.then(emitModalClick(this.element));
	}

	resetState() {
		this.selectedUserIds = [];
	}

	show() {
		this.element.style.display = 'flex';

		ChatsController.getChatUsers(this.chatId)
			.then(users => {
				const checkboxes = users
					.filter(user => user.id !== this.currentUser!.id && user.role !== 'admin')
					.map(user => new Checkbox({
						text: user.login,
						onChecked: () => this.selectedUserIds.push(user.id),
						onUnChecked: () => this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.id)
					}));

				this.setProps({ checkboxes });
			});
	}

	render(): DocumentFragment {
		return this.compile(RemoveUserTemplate, {
			title: this.props.title,
			noUsersError: this.props.noUsersError
		});
	}
}
