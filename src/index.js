import './styles/index.scss';

// Pages
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Signin } from './pages/signin';
import { ErrorPage } from './pages/errorPage/index.js';
import { ProfileInfoEdit } from './pages/profile-info-edit/index.js';
import { ProfilePasswordEdit } from './pages/profile-password-edit/index.js';
import { Chatting } from './pages/chatting/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  if (!root) return;

  const definitionRoute = () => {
    const route = window.location.pathname;

    switch (route) {
      case '/':
        root.innerHTML = Main({ content: 'main' });
        break;
      case '/login':
        root.innerHTML = Login();
        break;
      case '/sign-in':
        root.innerHTML = Signin();
        break;
      case '/profile':
        root.innerHTML = Profile();
        break;
      case '/chatting':
        root.innerHTML = Chatting();
        break;
      case '/profile-info-edit':
        root.innerHTML = ProfileInfoEdit();
        break;
      case '/profile-password-edit':
        root.innerHTML = ProfilePasswordEdit();
        break;
      default:
        // В зависимости от ошибки, передаем в шаблон код и текст
        root.innerHTML = ErrorPage({
          code: '505',
          text: 'Мы уже фиксим',
          redirectTo: '/chatting',
          redirectText: 'Назад к чатам',
        });
        break;
    }
  };

  definitionRoute();
});
