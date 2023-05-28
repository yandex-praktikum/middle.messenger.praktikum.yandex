import '../../assets/style/app.scss';
import router, {
    AUTH, ERROR404, ERROR500, MESSENGER, SETTINGS, SIGNUP,
} from '../../classes/Router';
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
            .use(AUTH, AuthPage)
            .use(SIGNUP, RegPage)
            .use(SETTINGS, ProfilePage)
            .use(MESSENGER, ChatPage)
            .use(ERROR404, Error404Page)
            .use(ERROR500, Error500Page)
            .start();
        Store.set('getPage', '');
    });
}
initApp();
