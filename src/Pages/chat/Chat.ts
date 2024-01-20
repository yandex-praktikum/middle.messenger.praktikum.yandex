import { IChatItem } from '../../Features/ChatListItem/ChatListItem';
import Component from '../../services/Component';
import { IChatDetail } from '../../Widgets/ChatDetail/ChatDetail';

interface IProps {
  currentChat?: IChatDetail;
  chats?: IChatItem[];
}

export class Chat extends Component<IProps> {
  constructor(props: IProps = {}) {
    const { chats = [], currentChat = {}, ...restProps } = props;
    super({ ...restProps, chats, currentChat });
  }

  render() {
    return `
      <div class="chat">
        <div class="chat_chatList">{{{ ChatList chats=chats }}}</div>
        <div class="chat_chatDetail">{{{ ChatDetail 
          messages=currentChat.messages 
          title=currentChat.title
          alt=currentChat.alt
          src=currentChat.src
        }}}</div>
      </div>
    `;
  }
}
