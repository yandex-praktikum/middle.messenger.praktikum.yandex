import { Input } from '../../Components';
import { IChatItem } from '../../Features/ChatListItem/ChatListItem';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';

interface IProps {
  chats?: IChatItem[];
  openProfile?: (event: ElementEvents['click']) => void;
}

type Refs = {
  search: Input;
};

export class ChatList extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    const { chats = [], ...restProps } = props;
    super({
      ...restProps,
      chats,
      openProfile: (event: ElementEvents['click']) => {
        event.preventDefault();

        navigate('userProfile');
      },
    });
  }

  render() {
    return `
      <div class="chatList">
        <div class="chatList_header">
          {{{ Button type='text' label='Профиль' onClick=openProfile }}}
          {{{ Input ref='search' placeholder='Поиск' }}}
        </div>
        <div class="chatList_body">
          <ul>
            {{#each chats}}
              <li>
                {{{ ChatListItem 
                  alt=this.alt 
                  src=this.src 
                  title=this.title 
                  lastMessage=this.lastMessage
                  messagesCount=this.messagesCount 
                  time=this.time }}}
              </li>
            {{/each}}
          </ul>
        </div>
      </div>
    `;
  }
}
