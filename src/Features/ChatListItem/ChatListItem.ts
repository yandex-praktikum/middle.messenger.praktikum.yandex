import Component from '../../services/Component';

export interface IChatItem {
  avatar?: string;
  alt?: string;
  title?: string;
  lastMessage?: string;
  time?: string;
  messagesCount?: number;
}

export class ChatListItem extends Component<IChatItem> {
  constructor(props: IChatItem) {
    const { avatar = '', alt = '', title = '', lastMessage = '', time = '', messagesCount = 0, ...restProps } = props;

    super({
      ...restProps,
      avatar,
      alt,
      title,
      lastMessage,
      time,
      messagesCount,
    });
  }

  render() {
    const { avatar, alt, title, lastMessage, time, messagesCount } = this.props;

    return `
      <div class="chatListItem">
        <div class="chatListItem_avatar">
            {{{ Avatar alt='${alt}' src='${avatar}' }}}
        </div>
        <div class="chatListItem_title">
            {{{ Text weight='700' size='medium' text='${title}' ellipsis=true }}}
        </div>
        <div class="chatListItem_lastMessage">
            {{{ Text size='small' type='secondary' text='${lastMessage}' ellipsis=true }}}
        </div>
        <div class="chatListItem_time">
            {{{ Text size='small' type='secondary' text='${time}' }}}
        </div>
        <div class="chatListItem_messagesCount">
            {{{ Badge count='${messagesCount}' }}}
        </div>
      </div>
    `;
  }
}
