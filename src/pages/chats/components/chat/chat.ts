import { Avatar } from '@components';
import { classNames } from '@utilities';
import { Block } from '@services';

import * as MOCK from '../../../../mock.json';
import { Time } from '../time/time';
import { Chat as IChat } from '../../chats.model';

import ChatTemplate from './chat.hbs';
import './chat.css';

interface Props {
  chat: IChat & { selected: boolean };
}

interface SuperProps extends Props {
	attr: {
		role: 'link'
	};
  avatar: Avatar;
  time: Time;

	onClick(e: Event): void;
}

export class Chat extends Block<SuperProps> {

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
			attr: { role: 'link' },
      avatar: new Avatar({ imgSrc: props.chat.avatar }),
      time: new Time({ date: props.chat['last_message'].time }),
      onClick: () => window.location.replace(`/chats?viewId=${props.chat.id}`)
    };

    const className = classNames('chat', { 'selected': props.chat.selected });

    super('div', className, superProps);
  }

  render(): DocumentFragment {
    const { chat } = this.props;
    const { user, content } = chat['last_message'];

    return this.compile(ChatTemplate, {
      title: chat.title,
      login: user.login,
      isYouLast: user.login === MOCK.profile.login,
      message: content,
      hasUnread: chat['unread_count'] > 0,
      unread: chat['unread_count']
    });
  }
}
