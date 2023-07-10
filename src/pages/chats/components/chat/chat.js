import { Avatar } from '@components';
import { classNames } from '@utilities';

import * as MOCK from '../../../../mock.json';
import { Time } from '../time/time';

import ChatTemplate from './chat.hbs';
import './chat.css';

export function Chat(chat) {
  const { user, time: date, content } = chat['last_message'];

  const className = classNames('chat', { 'selected': chat.selected });

  const avatar = Avatar({ imgLink: chat.avatar });
  const time = Time({ date });

  return ChatTemplate({
    id: chat.id,
    className,
    avatar,
    title: chat.title,
    login: user.login,
    isYouLast: user.login === MOCK.profile.login,
    message: content,
    time,
    hasUnread: chat['unread_count'] > 0,
    unread: chat['unread_count']
  });
}
