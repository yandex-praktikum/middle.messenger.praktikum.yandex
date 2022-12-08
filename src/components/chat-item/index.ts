import { ChatItem } from './chat-item';
import { chatItemsData } from './data-chat-item';

const chatItems: Array<ChatItem> = [];

chatItemsData.forEach((chatItem) => {

  const chatItemElement = new ChatItem({
    ...chatItem,
    settings: { withInternalID: true },

  });

  chatItems.push(chatItemElement);

});

export { chatItems };
