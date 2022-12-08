import { ChatContent } from './chat-content';
import { activeChat } from '../active-chat/index';

const chatContent = new ChatContent({
  activeChat: activeChat,
  settings: { withInternalID: true },
});

export { chatContent };
