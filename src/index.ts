import './index.less';

import LoginPage from './pages/authorization';
import RegistrationPage from './pages/registration';
import MessengerPage from './pages/messenger';
import ProfilePage from './pages/profile';
import Error404 from './pages/error404';
import Error500 from './pages/error500';
import Router from './utils/router';
import AuthController from './controllers/auth-controller';

enum Routes {
  Index = '/',
  SignUp = '/sign-up',
  Messenger = '/messenger',
  Profile = '/settings',
  Error404 = '/error-404',
  Error500 = '/error-500',
}

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.SignUp, RegistrationPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Error404, Error404)
    .use(Routes.Error500, Error500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
