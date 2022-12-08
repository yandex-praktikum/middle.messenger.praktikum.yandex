import { ChatPage } from './chat';
import { leftPanel } from '../../components/left-panel/index';
import { chatHeader } from '../../components/chat-header/index';
import { chatContent } from '../../components/chat-content/index';
import { newMessage } from '../../components/message/index';
import { render } from '../../utils/render';
import './chat.sass';

const chatPage = new ChatPage({
  leftPanel: leftPanel,
  chatHeader: chatHeader,
  chatContent: chatContent,
  newMessage: newMessage,
  settings: { withInternalID: true },
});

render('.root', chatPage);
