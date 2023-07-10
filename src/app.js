import { ErrorPage, LoginPage, SingInPage, ProfilePage, ChatsPage } from '@pages';
import { getQueryParam } from '@utilities';

import './styles/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');

  const getPage = () => {
    const [_, pathname] = window.location.pathname.split('/');

    if (!pathname) {
      window.location.replace('/login');
    }

    switch (pathname) {
      case 'login':
        return LoginPage();
      case 'signin':
        return SingInPage();
      case 'chats':
        return ChatsPage();
      case 'profile':
        return ProfilePage();
      case 'error':
        const status = getQueryParam('status');
        return ErrorPage({ status: status || 'Unknown error' });
      default:
        return ErrorPage({ status: 404 });
    }
  };

  root.innerHTML = getPage();
});
