import { Block, TProperties} from '../../utils/core/block';
import { chat } from './chat.tmpl';
import { LeftPanel } from '../../components/left-panel/left-panel';
import { ChatHeader } from '../../components/chat-header/chat-header';
import { ChatContent } from '../../components/chat-content/chat-content';
import { NewMessage } from '../../components/message/message';

type TChatPageProps = {
  leftPanel: LeftPanel;
  chatHeader: ChatHeader;
  chatContent: ChatContent;
  newMessage: NewMessage;
  settings?: TProperties;
};

class ChatPage extends Block<TChatPageProps> {
  constructor(props: TChatPageProps) {
    super(props);
  }
  render(): DocumentFragment {
    return this.compile(chat, this.props);
  }
}

export { ChatPage };
