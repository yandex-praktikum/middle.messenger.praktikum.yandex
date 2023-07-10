import { classNames } from '@utilities';

import { Time } from '../time/time';

import MessageTemplate from './message.hbs';
import './message.css';

export function Message({ message, profileId }) {
  const className = classNames('message__content', {
    'left': message.userId !== profileId,
    'right': message.userId === profileId
  });

  const time = Time({ date: message.time });

  return MessageTemplate({
    className,
    content: message.content,
    time,
    hasStatus: message.userId === profileId,
    read: message.read
  });
}
