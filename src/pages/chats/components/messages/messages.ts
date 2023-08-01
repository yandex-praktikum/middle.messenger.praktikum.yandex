import { ActionList, AddUser, ArrowLink, Avatar, Button, Input, Modal, Popup, RemoveUser } from '@components';
import { Block } from '@services';

import * as MOCK from '../../../../mock.json';
import { Message } from '../message/message';
import { Chat, Message as IMessage } from '../../chats.model';

import MessagesTemplate from './messages.hbs';
import './messages.css';

interface Props {
  chat?: Chat;
}

interface SuperProps extends Props {
  messages: Message[];
  backLink: ArrowLink;
  chatAvatar: Avatar;
	menuButton: Button;
	clipButton: Button;
  messageInput: Input;
  sendButton: Button;
	userActionsPopup: Popup;
	clipActionsPopup: Popup;
	addUserModal: Modal;
	removeUserModal: Modal;
}

export class Messages extends Block<SuperProps> {

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      messages: (props.chat ? (MOCK.messages as Record<string, IMessage[]>)[props.chat.id] : [])
        .map(message => new Message({ message, profileId: MOCK.profile.id })),
      backLink: new ArrowLink({ attr: { href: '/chats' }, reversed: true }),
      chatAvatar: new Avatar({ imgSrc: props.chat?.avatar || '', mode: 'small' }),
			menuButton: new Button({
				imgSrc: 'icons/menu.svg',
				imgSize: 16,
				noStyles: true,
				onClick: e => this.props.userActionsPopup.attach(e)
			}),
			clipButton: new Button({
				imgSrc: 'icons/clip.svg',
				imgSize: 26,
				noStyles: true,
				onClick: e => this.props.clipActionsPopup.attach(e)
			}),
      messageInput: new Input({
        attr: {
          name: 'message',
          value: '',
          placeholder: 'Сообщение'
        }
      }),
      sendButton: new Button({
        imgSrc: 'icons/arrow-right.svg',
        rounded: true,
				onClick: () => this.onSendMessage()
      }),
			userActionsPopup: new Popup({
				content: new ActionList({
					items: [
						new Button({
							text: 'Добавить пользователя',
							imgSrc: 'icons/add-user.svg',
							imgSize: 20,
							noStyles: true,
							onClick: () => this.props.addUserModal.show()
						}),
						new Button({
							text: 'Удалить пользователя',
							imgSrc: 'icons/remove-user.svg',
							imgSize: 20,
							noStyles: true,
							onClick: () => this.props.removeUserModal.show()
						})
					]
				}),
				align: 'end'
			}),
			clipActionsPopup: new Popup({
				content: new ActionList({
					items: [
						new Button({
							text: 'Фото или Видео',
							imgSrc: 'icons/chat-image.svg',
							imgSize: 20,
							noStyles: true
						}),
						new Button({
							text: 'Файл',
							imgSrc: 'icons/chat-file.svg',
							imgSize: 20,
							noStyles: true
						}),
						new Button({
							text: 'Локация',
							imgSrc: 'icons/chat-location.svg',
							imgSize: 20,
							noStyles: true
						})
					]
				}),
			}),
			addUserModal: new Modal({ content: new AddUser() }),
			removeUserModal: new Modal({ content: new RemoveUser() })
    };

    super('div', 'messages', superProps);
  }

	onSendMessage() {
		const message = this.props.messageInput.getValue();

		if (!message) {
			return;
		}

		console.log('message', message);
	}

  render(): DocumentFragment {
    return this.compile(MessagesTemplate, { chatName: this.props.chat?.title });
  }
}
