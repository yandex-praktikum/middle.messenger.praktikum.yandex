import { ActiveChat } from './active-chat';
import { activeChatMessagesData } from './data-active-chat';

const activeChat: Array<ActiveChat> = [];

activeChatMessagesData.forEach((messageProps) => {
  const messageElement = new ActiveChat({
    ...messageProps,
    settings: { withInternalID: true },
  });
  activeChat.push(messageElement);
});

export { activeChat };
