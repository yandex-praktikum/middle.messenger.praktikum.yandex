import '../../app.scss';

import templateErrorPage from './error.hbs';
import { Link } from '../../components/link/link';
import './error.scss';
import ErrorPage from './error';


const error404 = new ErrorPage({
    title: '404',
    subtitle: 'Не туда попали',
    attr: {
        class: 'app__error-page',
    },
    backlink: new Link({
        text: 'Назад к чатам',
        href: '/chat.html',
        attr: {
            class: 'link',
        },
    }),
}, templateErrorPage);

// eslint-disable-next-line no-undef
const root = document.getElementById('app');
if (root) {
    root.innerHTML = '';
    root.append(error404.getContent());
}
