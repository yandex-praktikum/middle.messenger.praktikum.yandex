import templateApp from '../../app.hbs';
import '../../app.scss';


import templateErrorPage from './error.hbs';
import link from '../../components/link/link';
import './error.scss';




export const errorPage = templateErrorPage({
    title:'500',
    subtitle:'Мы уже фиксим',
    backlink:link({
        href: '/chat.html',
        label: 'Назад к чатам'
    })
})


document.body.innerHTML = templateApp({ sidebar: '', page: errorPage });
