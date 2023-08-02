import { Block, Store } from '@services';
import { getAuthUser, getQueryParam } from '@utilities';
import { Link } from '@components';
import { CHATS_PATH, LOGIN_PATH } from '@constants';

import ErrorTemplate from './error.hbs';
import './error.css';

interface SuperProps {
  status: string;
	backLink: Link;
}

export class ErrorPage extends Block<SuperProps> {

  constructor() {
		const user = Store.getState(getAuthUser);
		const [_, pathname] = window.location.pathname.split('/');

		const superProps: SuperProps = {
			status: pathname === 'error' ? (getQueryParam('status') || 'Unknown error') : '404',
			backLink: new Link({
				attr: { href: user ? CHATS_PATH : LOGIN_PATH },
				text: user ? 'Назад к чатам' : 'Назад к странице входа'
			})
		};

    super('div', 'error', superProps);
  }

  render(): DocumentFragment {
    const text = this.props.status === '404'
      ? 'Данной страницы не существует'
      : 'Мы уже фиксим проблему...';
    return this.compile(ErrorTemplate, { status: this.props.status, text });
  }
}
