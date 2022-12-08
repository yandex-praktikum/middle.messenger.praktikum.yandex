import { Block, TProperties} from '../../utils/core/block';
import { chatItem } from './chat-item.tmpl';

type TChatItem = {
  avatar?: string;
  time: string;
  author: string;
  message?: string;
  unreadCount?: number | null;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class ChatItem extends Block<TChatItem> {
  constructor(props: TChatItem) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(chatItem, this.props);
  }
}

export { ChatItem, TChatItem };
