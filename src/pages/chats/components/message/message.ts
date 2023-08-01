import { classNames } from '@utilities';
import { Block } from '@services';

import { Time } from '../time/time';
import { Message as IMessage } from '../../chats.model';

import MessageTemplate from './message.hbs';
import './message.css';

interface Props {
  message: IMessage;
  profileId: string;
}

interface SuperProps extends Props {
  time: Time;
}

export class Message extends Block<SuperProps> {

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      time: new Time({ date: props.message.time })
    };

    super('div', 'message', superProps);
  }

  render(): DocumentFragment {
    const { message, profileId } = this.props;

    const className = classNames('message__content', {
      'message__content_left': message.userId !== profileId,
      'message__content_right': message.userId === profileId
    });

    return this.compile(MessageTemplate, {
      className,
      content: message.content,
      hasStatus: message.userId === profileId,
      read: message.read
    });
  }
}
