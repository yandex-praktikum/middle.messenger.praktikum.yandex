import { ErrorPage, LoginPage, SignInPage, ProfilePage, ChatsPage } from '@pages';
import { getQueryParam, hideAllPopups } from '@utilities';
import { Page } from '@layout';

import './styles/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');

  if (!root) {
    return;
  }

	window.addEventListener('click', hideAllPopups);
	window.addEventListener('resize', hideAllPopups);

  const getPage = () => {
    const [_, pathname] = window.location.pathname.split('/');

    if (!pathname) {
      window.location.replace('/login');
    }

    switch (pathname) {
      case 'login':
        return new LoginPage();
      case 'signin':
        return new SignInPage();
      case 'chats':
        return new ChatsPage();
      case 'profile':
        return new ProfilePage();
      case 'error':
        return new ErrorPage({
          status: getQueryParam('status') || 'Unknown error'
        });
      default:
        return new ErrorPage({ status: 404 });
    }
  };

  const page = new Page({ child: getPage() });

  root.appendChild(page.getContent());

  page.dispatchComponentDidMount();
});
