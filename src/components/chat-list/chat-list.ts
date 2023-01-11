import { Block } from '../../utils/block';
import { IChatsListProps } from '../../utils/interfaces'
import template from './chat-list.hbs';
import { Chat } from '../chat/chat';
import { withStore } from '../../hocs/with-store';
import ChatsController from '../../controllers/chat-controller';
import './chat-list.less';

export class ChatsListBase extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
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
