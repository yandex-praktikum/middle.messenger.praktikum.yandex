import { Avatar } from '@components';
import { classNames, getAuthUser } from '@utilities';
import { Block, Router, Store } from '@services';
import { CHATS_PATH } from '@constants';
import { ChatsResponse } from '@models';

import { Time } from '../time/time';

import ChatTemplate from './chat.hbs';

import './chat.css';

interface Props {
  chat: ChatsResponse & { selected: boolean };
}

interface SuperProps extends Props {
	attr: {
		role: 'link'
	};
  avatar: Avatar;
  time: Time | null;

	onClick(e: Event): void;
}

export class Chat extends Block<SuperProps> {

	get chat(): ChatsResponse {
		return this.props.chat;
	}

	get lastMessage() {
		return this.chat['last_message'] || {
			user: null,
			time: null,
			content: null
		};
	}

  constructor(props: Props) {
		const lastMessage = props.chat['last_message'];

    const superProps: SuperProps = {
      ...props,
			attr: { role: 'link' },
      avatar: new Avatar({ imgSrc: props.chat.avatar }),
      time: lastMessage ? new Time({ date: lastMessage.time }) : null,
      onClick: () => Router.go(`${CHATS_PATH}?viewId=${props.chat.id}`)
    };

    const className = classNames('chat', { 'selected': props.chat.selected });

    super('div', className, superProps);
  }

  render(): DocumentFragment {
    const { user, content } = this.lastMessage;

    return this.compile(ChatTemplate, {
      title: this.chat.title,
      login: user?.login,
      isYouLast: user?.login === Store.getState(getAuthUser)?.login,
      message: content,
      unread: this.chat['unread_count']
    });
  }
}
