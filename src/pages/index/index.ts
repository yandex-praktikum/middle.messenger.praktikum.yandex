import '../../assets/style/app.scss';
import router, { PathName } from '../../classes/Router';
import Store from '../../classes/Store';
import AuthController from '../../controlles/AuthController';
// import Store from '../../classes/Store';
import AuthPage from '../auth/auth';
import ChatPage from '../chat/chat';
import { Error404Page, Error500Page } from '../error/error';
import ProfilePage from '../profile/profile';
import RegPage from '../reg/reg';

export default function initApp() {
    AuthController.getUserInfo().then(() => {
        router
            .use(PathName.AUTH, AuthPage)
            .use(PathName.SIGNUP, RegPage)
            .use(PathName.SETTINGS, ProfilePage)
            .use(PathName.MESSENGER, ChatPage)
            .use(PathName.ERROR404, Error404Page)
            .use(PathName.ERROR500, Error500Page)
            .start();
        Store.set('getPage', '');
    });
}
initApp();
