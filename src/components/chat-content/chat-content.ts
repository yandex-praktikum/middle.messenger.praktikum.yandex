import { Block, TProperties} from '../../utils/core/block';
import { chatContent } from './chat-content.tmpl';
import { ActiveChat } from '../active-chat/active-chat';

type TChatContent = {
  activeChat: Array<ActiveChat>;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class ChatContent extends Block<TChatContent> {
  constructor(props: TChatContent) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(chatContent, this.props);
  }
}

export { ChatContent, TChatContent };
