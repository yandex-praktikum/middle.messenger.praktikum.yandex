import { ArrowLink, ArrowRound, Avatar } from '@components';

import * as MOCK from '../../../../mock.json';
import { Message } from '../message/message';

import MessagesTemplate from './messages.hbs';
import './messages.css';

export function Messages({ chat }) {
  if (!chat) {
    return MessagesTemplate({ hasContent: false });
  }

  const messages = (MOCK.messages[chat.id] || []).map(message =>
    Message({ message, profileId: MOCK.profile.id }));

  const backLink = ArrowLink({ href: '/chats ', reversed: true });
  const chatAvatar = Avatar({ imgLink: chat.avatar, mode: 'small' });
  const arrowRound = ArrowRound({ reversed: true });

  return MessagesTemplate({
    hasContent: true,
    backLink,
    chatAvatar,
    chatName: chat.title,
    messages,
    arrowRound
  });
}
