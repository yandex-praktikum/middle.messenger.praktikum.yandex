import templateApp from '../../app.hbs';
import '../../app.scss';


import templateErrorPage from './error-page.hbs';
import link from '../../ui/link/link';
import './error-page.scss';




export default errorPage = templateErrorPage({
    title: '404',
    subtitle: 'Не туда попали',
    backlink: link({
        href: '/chat.html',
        label: 'Назад к чатам'
    })
})


document.body.innerHTML = templateApp({ sidebar: '', page: errorPage });
