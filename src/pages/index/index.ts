import '../../assets/style/app.scss';
import Router from '../../classes/Router';
// import Store from '../../classes/Store';
import { set } from '../../utils/object_utils';
import AuthPage from '../auth/auth';
import ChatPage from '../chat/chat';
import { Error404Page, Error500Page } from '../error/error';
import ProfilePage from '../profile/profile';
import RegPage from '../reg/reg';
import IndexPage from './temp_index';

const router = new Router('#app');

router
    .use('/', AuthPage)
    .use('/ii', IndexPage)
    .use('/sign-up', RegPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage)
    .use('*', Error404Page)
    .use('/500', Error500Page)
    .start();


// window.onload = () => {
//     let loc = window.location.pathname;
//     if (loc === '/123') {
//         history.pushState({}, '', '/auth.html');
//         window.location.pathname = '/auth.html';
//         console.log(window.location.pathname);
//     }
// }
export default router;


// console.log(Store);
