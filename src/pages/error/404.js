import templateApp from '../../app.hbs';
import '../../app.scss';


import templateErrorPage from './error.hbs';
import link from '../../components/link/link';
import './error.scss';




export const errorPage = templateErrorPage({
    title: '404',
    subtitle: 'Не туда попали',
    backlink: link({
        href: '/chat.html',
        label: 'Назад к чатам'
    })
})


document.body.innerHTML = templateApp({ sidebar: '', page: errorPage });
