import { Page } from '@layout';
import { classNames, getQueryParam } from '@utilities';

import * as MOCK from '../../mock.json';

import { Chat, Messages, Panel } from './components';
import ChatsTemplate from './chats.hbs';
import './chats.css';

export function ChatsPage() {
  const selectedChatId = getQueryParam('viewId');
  const selectedChat = MOCK.chats.find(chat => chat.id === Number(selectedChatId));

  const chatList = MOCK.chats.map(chat => Chat({
    ...chat,
    selected: Number(selectedChatId) === chat.id
  }));
  
  const panel = Panel({ chatList });
  const messages = Messages({ chat: selectedChat });

  const messagesClassName = classNames('chats-messages', { 'hidden': !selectedChat }); //temporary

  const chats = ChatsTemplate({ panel, messages, messagesClassName });

  return Page({ children: chats });
}
