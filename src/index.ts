// import { LoginPage } from './pages/Login';
// import { RegisterPage } from './pages/Register';
// import Router from './utils/Router';
// import { ProfilePage } from './pages/Profile';
// import AuthController from './controllers/AuthController';
// import { MessengerPage } from './pages/Messenger';

// enum Routes {
//   Index = '/',
//   Register = '/register',
//   Profile = '/profile',
//   Messenger = '/messenger',
// }

// window.addEventListener('DOMContentLoaded', async () => {
//   Router
//     .use(Routes.Index, LoginPage)
//     .use(Routes.Register, RegisterPage)
//     .use(Routes.Profile, ProfilePage)
//     .use(Routes.Messenger, MessengerPage)

//   let isProtectedRoute = true;

//   switch (window.location.pathname) {
//     case Routes.Index:
//     case Routes.Register:
//       isProtectedRoute = false;
//       break;
//   }

//   try {
//     await AuthController.fetchUser();

//     Router.start();

//     if (!isProtectedRoute) {
//       Router.go(Routes.Profile)
//     }
//   } catch (e) {
//     Router.start();

//     if (isProtectedRoute) {
//       Router.go(Routes.Index);
//     }
//   }

// });

console.log('testing')