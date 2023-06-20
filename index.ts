import { LoginPage } from './src/pages/Login/index.login'
// import { RegisterPage } from './src/pages/Register';
import Router from './src/utils/Router'
// import { ProfilePage } from './src/pages/Profile';
import AuthController from './src/controllers/AuthController'
// import { MessengerPage } from './src/pages/Messenger';

enum Routes {
  Index = '/',
  Register = '/register',
  Profile = '/profile',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
  // .use(Routes.Register, RegisterPage)
  // .use(Routes.Profile, ProfilePage)
  // .use(Routes.Messenger, MessengerPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
      break
  }
  try {
    // await AuthController.fetchUser()
    Router.start()

    // if (!isProtectedRoute) {
    //   Router.go(Routes.Profile)
    // }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
