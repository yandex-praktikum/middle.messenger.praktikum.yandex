import { Block } from '../../utils/Block';
import template from './chatsList.hbs';
import { IChatsListProps } from '../../utils/Interfaces';
import { Chat } from '../Chat/chat';
import { withStore } from '../../hocs/WithStore';
import ChatsController from '../../controllers/ChatsController';
import './chatsList.less';

export class ChatsListBase extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    //this.children.profileLink = new Link({ to: '/profile', label: 'Профиль'});
  }

  protected componentDidUpdate(oldProps: IChatsListProps, newProps: IChatsListProps): boolean {
    if (newProps.chats) {
      this.children.chats = this.createChats(newProps);
    }
    return true;
  }

  private createChats(props: IChatsListProps) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
    });
  }
  
}

const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      chats: [...(state.chats || [])],
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    chats: [...(state.chats || [])],
  };
});

export const ChatsList = withChats(ChatsListBase as any);
