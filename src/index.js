import Handlebars from 'handlebars';

import registerPartial from './utils/registerPartial';
import registerHelpers from './utils/registerHelpers';

import Login from './pages/Login/Login';
import Signin from './pages/Signin/Signin';
import Chats from './pages/Chats/Chats';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';

import chats from './mock/сhats';
import searchChats from './mock/search'
import chat from './mock/chat';
import { users, user } from './mock/users';
import login from './mock/login';
import signin from './mock/signin';
import addUser from './mock/addUser';
import createChat from './mock/createChat';

registerPartial();
registerHelpers();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const path = window.location.pathname;
  let result = null;

  switch (path) {
    case '/login': {
      result = Handlebars.compile(Login)({ fields: login });

      break;
    }
    case '/signin': {
      result = Handlebars.compile(Signin)({ fields: signin });

      break;
    }
    case '/chats': {
      result = Handlebars.compile(Chats)({ chats });

      break;
    }
    case '/search': {
      result = Handlebars.compile(Chats)({
        chats: searchChats,
        chat,
        users,
        open_chat_id: 5,
        search: 'ол',
      });

      break;
    }
    case '/chat': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
      });

      break;
    }
    case '/menu': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showMembersMenu: true,
        showFilesMenu: true,
      });

      break;
    }
    case '/add-user': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showAddUserModal: true,
        fields: addUser,
      });

      break;
    }
    case '/remove-user': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showRemoveUserModal: true,
      });

      break;
    }
    case '/members': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showMembers: true,
      });

      break;
    }
    case '/create-chat': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showCreateChatModal: true,
        fields: createChat,
      });

      break;
    }
    case '/remove-chat': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showRemoveChatModal: true,
      });

      break;
    }
    case '/avatar-load': {
      result = Handlebars.compile(Chats)({
        chats,
        chat,
        users,
        open_chat_id: 5,
        showAvatarLoadModal: true,
      });

      break;
    }
    case '/profile': {
      result = Handlebars.compile(Profile)({
        user,
      });

      break;
    }
    case '/edit-profile': {
      result = Handlebars.compile(Profile)({
        user,
        editProfile: true,
      });

      break;
    }
    case '/edit-password': {
      result = Handlebars.compile(Profile)({
        user,
        editPassword: true,
      });

      break;
    }
    case '/exit': {
      result = Handlebars.compile(Profile)({
        user,
        exit: true,
      });

      break;
    }
    case '/error': {
      result = Handlebars.compile(Error)({
        code: 500,
        message: 'Мы уже фиксим',
      });

      break;
    }
    case '/': {
      result = Handlebars.compile(Chats)({ chats });

      break;
    }
    default: {
      result = Handlebars.compile(Error)({
        code: 404,
        message: 'Не туда попали',
        handIcon: true,
      });
    }
  }

  root.innerHTML = result;
});

// TODO: это должно проматывать чаты в конец, но пока почему-то не срабатывает
document.addEventListener('DOMContentLoaded', () => {
  const chat = document.querySelector('.chat-space__body');

  if (chat) {
    chat.scrollTop = chat.scrollHeight;
  }
});
