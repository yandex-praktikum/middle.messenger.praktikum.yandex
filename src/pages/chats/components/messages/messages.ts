import {
	ActionList,
	AddUser,
	ArrowLink,
	Avatar,
	Button,
	ChangeAvatar,
	Input,
	Modal,
	Popup,
	RemoveUser
} from '@components';
import { ConnectBlock } from '@services';
import { CHATS_PATH } from '@constants';
import { ChatsController } from '@controllers';
import { getChatById, isEnterEvent } from '@utilities';
import { ChatsResponse } from '@models';

import { Message } from '../message/message';

import MessagesTemplate from './messages.hbs';
import './messages.css';

interface Props {
  chat: ChatsResponse;
}

interface SuperProps extends Props {
  messages: Message[];
  backLink: ArrowLink;
  chatAvatar: Avatar;
	menuButton: Button;
  messageInput: Input;
  sendButton: Button;
}

export class Messages extends ConnectBlock<SuperProps> {

	addUserModal = new Modal({ content: new AddUser() });
	removeUserModal = new Modal({ content: new RemoveUser() });
	changeChatAvatarModal = new Modal({
		content: new ChangeAvatar( { onSaveFile: this.changedChatAvatar.bind(this) })
	});

	actionsPopup = new Popup({
		content: new ActionList({
			items: [
				new Button({
					text: 'Добавить пользователей',
					imgSrc: 'icons/add-user.svg',
					imgSize: 20,
					noStyles: true,
					onClick: () => this.addUserModal.show()
				}),
				new Button({
					text: 'Удалить пользователей',
					imgSrc: 'icons/remove-user.svg',
					imgSize: 20,
					noStyles: true,
					onClick: () => this.removeUserModal.show()
				}),
				new Button({
					text: 'Удалить чат',
					danger: true,
					noStyles: true,
					onClick: this.deleteChat.bind(this)
				})
			]
		}),
		align: 'end'
	});

	get chat(): ChatsResponse {
		return this.props.chat;
	}

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      messages: [].map(message => new Message({ message, profileId: '' })),
      backLink: new ArrowLink({ attr: { href: CHATS_PATH }, reversed: true }),
			chatAvatar: new Avatar({
				imgSrc: props.chat.avatar,
				mode: 'small',
				hover: true,
				onClick: () => this.changeChatAvatarModal.show()
			}),
			menuButton: new Button({
				imgSrc: 'icons/menu.svg',
				imgSize: 16,
				noStyles: true,
				onClick: e => this.actionsPopup.attach(e)
			}),
      messageInput: new Input({
        attr: {
          name: 'message',
          value: '',
          placeholder: 'Сообщение'
        },
				onKeyUp: e => isEnterEvent(e) && this.sendMessage()
			}),
      sendButton: new Button({
        imgSrc: 'icons/arrow-right.svg',
        rounded: true,
				onClick: () => this.sendMessage()
      })
    };

    super('div', 'messages', superProps, getChatById(props.chat.id));
  }

	onStoreUpdated(chat: ChatsResponse) {
		if (!chat) {
			return;
		}

		this.setProps({ chat });
		this.props.chatAvatar.setProps({ imgSrc: chat.avatar });
	}

	changedChatAvatar(file: File) {
		const data = new FormData();
		data.append('chatId', this.chat.id.toString());
		data.append('avatar', file);

		ChatsController.changeChatAvatar(data)
			.then(() => this.changeChatAvatarModal.hide());
	}

	sendMessage() {
		const message = this.props.messageInput.getValue();

		if (!message) {
			return;
		}

		console.log('message', message);
	}

	deleteChat() {
		ChatsController.deleteChat({ chatId: this.chat.id });
	}

	componentWillUnmount() {
		[
			this.addUserModal,
			this.removeUserModal,
			this.changeChatAvatarModal,
			this.actionsPopup
		].forEach(comp => comp.componentWillUnmount());
	}

	render(): DocumentFragment {
    return this.compile(MessagesTemplate, { chatName: this.chat.title });
  }
}
