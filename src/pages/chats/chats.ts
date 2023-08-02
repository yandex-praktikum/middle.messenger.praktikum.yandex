import { classNames, getChats, getQueryParam } from '@utilities';
import { ConnectBlock, Store } from '@services';
import { ChatsResponse } from '@models';

import { Chat, Messages, NoMessages, Panel } from './components';
import ChatsTemplate from './chats.hbs';
import './chats.css';

interface SuperProps {
  panel: Panel;
  messages: Messages | NoMessages;
  messagesClassName: string;
}

function getChatList() {
	const chats = Store.getState(getChats);

	const selectedChatId = +(getQueryParam('viewId') as string);
	const selectedChat: ChatsResponse | undefined = chats.find(chat => chat.id === selectedChatId);

	Store.updateState('selectedChatId', selectedChatId);

	const chatList: Chat[] = chats.map(chat => new Chat({
		chat: {
			...chat,
			selected: selectedChatId === chat.id
		}
	}));

	return { chatList, selectedChat };
}

export class ChatsPage extends ConnectBlock<SuperProps> {

  constructor() {
		const { chatList, selectedChat } = getChatList();

		const superProps: SuperProps = {
			panel: new Panel({ chatList }),
			messages: selectedChat ? new Messages({ chat: selectedChat }) : new NoMessages(),
			messagesClassName: classNames(
				'chats-messages', { 'chats-messages_hidden': !selectedChat }
			)
		};

    super('div', 'chats', superProps, getChats);
  }

	onStoreUpdated() {
		const { chatList } = getChatList();
		this.props.panel.setProps({ chatList });
	}

	componentWillUnmount() {
		Store.updateState('selectedChatId', null);
	}

	render(): DocumentFragment {
    return this.compile(ChatsTemplate, { messagesClassName: this.props.messagesClassName });
  }
}
