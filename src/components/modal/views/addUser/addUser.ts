import { Block, Store } from '@services';
import { emitModalClick, getSelectedChatId, isEnterEvent } from '@utilities';
import { ChatsController, UserController } from '@controllers';

import { Fieldset } from '../../../fieldset/fieldset';
import { Button } from '../../../button/button';
import { Checkbox } from '../../../checkbox/checkbox';
import { Error } from '../../../error/error';

import AddUserTemplate from './addUser.hbs';
import './addUser.css';

interface SuperProps {
	title: string;
	searchFieldset: Fieldset;
	searchButton: Button;
	checkboxes: Checkbox[];
	saveButton: Button;
	noUsersError: Error | null;
}

export class AddUser extends Block<SuperProps> {

	chatId = Store.getState(getSelectedChatId)!;
	selectedUserIds: number[] = [];

	searchedValue: string = '';

	get searchFieldset(): Fieldset {
		return this.props.searchFieldset;
	}

	constructor() {
		const superProps: SuperProps = {
			title: 'Добавить пользователей',
			searchFieldset: new Fieldset({
				name: 'login',
				label: 'Логин',
				value: '',
				onKeyUp: e => isEnterEvent(e) && this.searchUsers()
			}),
			searchButton: new Button({
				rounded: true,
				imgSrc: 'icons/arrow-right.svg',
				imgSize: 10,
				onClick: () => this.searchUsers()
			}),
			checkboxes: [],
			saveButton: new Button({
				text: 'Добавить',
				className: 'add-user__add-btn',
				onClick: () => this.addUsers()
			}),
			noUsersError: null
		};

		super('div', 'add-user', superProps);
	}

	searchUsers() {
		const login = this.searchFieldset.getValue();

		if (!login || login === this.searchedValue) {
			return;
		}

		UserController.findUsersByLogin({ login })
			.then(users => {
				const checkboxes = users.map(user => new Checkbox({
					text: user.login,
					checked: this.selectedUserIds.includes(user.id),
					onChecked: () => this.selectedUserIds.push(user.id),
					onUnChecked: () => this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.id)
				}));

				this.searchedValue = login;
				this.setProps({ checkboxes });
			});
	}

	addUsers() {
		if (!this.selectedUserIds.length) {
			this.setProps({ noUsersError: new Error({ text: 'Необходимо выбрать пользователей' })});
			return;
		}

		ChatsController.addUsersForChat({ users: this.selectedUserIds, chatId: this.chatId })
			.then(emitModalClick(this.element));
	}

	resetState() {
		super.resetState();
		this.selectedUserIds = [];
	}

	show() {
		this.element.style.display = 'flex';
	}

	render(): DocumentFragment {
		return this.compile(AddUserTemplate, {
			title: this.props.title,
			noUsersError: this.props.noUsersError
		});
	}
}
