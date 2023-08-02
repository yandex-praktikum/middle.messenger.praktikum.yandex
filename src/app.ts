import { ErrorPage, LoginPage, SignInPage, ProfilePage, ChatsPage } from '@pages';
import { getAuthUser, hideAllPopups } from '@utilities';
import { Router, Store } from '@services';
import {
	APP_ID, CHATS_PATH, LOGIN_PATH, NOTIFIER_ID, ROOT_ID, SETTINGS_PATH, SIGNUP_PATH
} from '@constants';
import { AuthController } from '@controllers';

import './styles/styles.css';

function renderRootElements(rootEl: HTMLElement) {
	const appEl = document.createElement('div');
	const notifierEl = document.createElement('div');

	appEl.setAttribute('id', APP_ID);
	notifierEl.setAttribute('id', NOTIFIER_ID);

	rootEl.appendChild(appEl);
	rootEl.appendChild(notifierEl);
}

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById(ROOT_ID);

  if (!root) {
    return;
  }

	renderRootElements(root);

	window.addEventListener('click', hideAllPopups);
	window.addEventListener('resize', hideAllPopups);

	const { pathname, search } = window.location;

	await AuthController.getAuthUser();

	Router
		.use(LOGIN_PATH, LoginPage, false)
		.use(SIGNUP_PATH, SignInPage, false)
		.use(CHATS_PATH, ChatsPage, true)
		.use(SETTINGS_PATH, ProfilePage, true)
		.use('**', ErrorPage, false);

	let url: string;

	if (pathname === '/') {
		url = Store.getState(getAuthUser) ? CHATS_PATH : LOGIN_PATH;
	} else {
		url = pathname + search;
	}

	Router.go(url);
});
