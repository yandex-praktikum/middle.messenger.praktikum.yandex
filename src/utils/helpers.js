import { user } from '../mock/users';
import chats from '../mock/сhats';
import Handlebars from "handlebars";

const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const millisecond = 1;
const second = 1000 * millisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;

// Получаем объект с группами сообщений, в ключах - даты
export const groupMessagesByDate = (messages) => {
  const groupedMessages = {};

  messages.forEach(message => {
    const dateString = new Date(message.time).toDateString();

    if (!groupedMessages[dateString]) {
      groupedMessages[dateString] = [];
    }

    groupedMessages[dateString].push(message);
  });

  return groupedMessages;
};

// Получаем отсортированные даты групп сообщений
export const sortedGroupDates = (groupedMessages) => Object.keys(groupedMessages)
  .sort((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime());

// Получаем сообщения по определенной дате
export const getMessagesAtDate = (messageGroups, date) => messageGroups[date];

export const formatChatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMilliseconds = now - date;

  if (diffInMilliseconds < day) {
    // Текущая дата
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (diffInMilliseconds < week) {
    // Текущая неделя
    return daysOfWeek[date.getDay()];
  }

  if (date.getFullYear() === now.getFullYear()) {
    // Текущий год
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  }

  // Предыдущие годы
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' });
};

export const formatMessageTime = (dateStr) => (
  new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
);

export const getDate = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);

  if (date.getFullYear() === now.getFullYear()) {
    // Текущий год
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' });
  }

  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
};

export const isCurrentUser = (email) => {
  return email === user.email;
};

export const countMembers = (users) => users.length > 2 ? users.length : null;

export const getMembers = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
   return `${count} участник`;
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} участника`;
  }

  return `${count} участников`;
};

export const isAnyChatOpen = (chatId) => !!(chatId || chatId === 0);

const getChatInfo = (chatId) => chats.find((chat) => chat.id === chatId);

export const getChatAvatar = (chatId) => {
  const chat = getChatInfo(chatId);

  if (chat) {
    return chat.avatar;
  }
};

export const getChatTitle = (chatId) => {
  const chat = getChatInfo(chatId);

  if (chat) {
    return chat.title;
  }
};

export const isChatActive = (chatId, openChatId) => chatId === openChatId;

export const getIcon = (iconName, className) => {
  const icon = Handlebars.partials[iconName];

  if (icon) {
    return new Handlebars.SafeString(icon.split(`{{ class }}`).join(`${className}`));
  }

  console.warn(`Иконка ${iconName} не найдена`);
}
