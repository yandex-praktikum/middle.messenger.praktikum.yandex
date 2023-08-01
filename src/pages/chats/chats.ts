import { classNames, getQueryParam } from '@utilities';
import { Block } from '@services';

import * as MOCK from '../../mock.json';

import { Chat, Messages, Panel } from './components';
import ChatsTemplate from './chats.hbs';
import { Chat as IChat } from './chats.model';
import './chats.css';

interface SuperProps {
  panel: Panel;
  messages: Messages;
  messagesClassName: string;
}

export class ChatsPage extends Block<SuperProps> {

  constructor() {
    const selectedChatId = getQueryParam('viewId');
    const selectedChat: IChat | undefined = MOCK.chats.find(chat => chat.id === selectedChatId);

    const chatList: Chat[] = MOCK.chats.map(chat => new Chat({
      chat: {
        ...chat,
        selected: selectedChatId === chat.id
      }
    }));

    const superProps: SuperProps = {
      panel: new Panel({ chatList }),
      messages: new Messages({ chat: selectedChat }),
      messagesClassName: classNames(
        'chats-messages', { 'chats-messages_hidden': !selectedChatId }
      )
    };

    super('div', 'chats', superProps);
  }

  render(): DocumentFragment {
    return this.compile(ChatsTemplate, { messagesClassName: this.props.messagesClassName });
  }
}
