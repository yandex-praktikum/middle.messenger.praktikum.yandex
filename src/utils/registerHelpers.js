import Handlebars from 'handlebars';

import {
  groupMessagesByDate,
  formatChatTime,
  formatMessageTime,
  getDate,
  isCurrentUser,
  countMembers,
  getMembers,
  isAnyChatOpen,
  getChatAvatar,
  getChatTitle,
  sortedGroupDates,
  getMessagesAtDate,
  isChatActive,
  getIcon,
} from './helpers';

const registerHelpers = () => {
  Handlebars.registerHelper('messageClass', (outgoing) => outgoing ? 'outgoing' : 'incoming');
  Handlebars.registerHelper('showChatTime', formatChatTime);
  Handlebars.registerHelper('showMessageTime', formatMessageTime);
  Handlebars.registerHelper('showDate', getDate);
  Handlebars.registerHelper('isCurrentUser', isCurrentUser);
  Handlebars.registerHelper('countMembers', countMembers);
  Handlebars.registerHelper('getMembers', getMembers);
  Handlebars.registerHelper('isAnyChatOpen', isAnyChatOpen);
  Handlebars.registerHelper('getChatAvatar', getChatAvatar);
  Handlebars.registerHelper('getChatTitle', getChatTitle);
  Handlebars.registerHelper('getGroupMessagesByDate', groupMessagesByDate);
  Handlebars.registerHelper('messageGroupsOrder', sortedGroupDates);
  Handlebars.registerHelper('getMessagesAtDate', getMessagesAtDate);
  Handlebars.registerHelper('isChatActive', isChatActive);
  Handlebars.registerHelper('getIcon', getIcon);
  Handlebars.registerHelper('and', (a, b) => !!(a && b));
  Handlebars.registerHelper('or', (a, b) => !!(a || b));
  Handlebars.registerHelper('createHref', (src) => new URL(`/static/images/${src}`, import.meta.url).href);
};

export default registerHelpers;

