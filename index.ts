import { LoginPage } from './src/pages/Login/index.login'
import { RegisterPage } from './src/pages/Register/index.register'
import Router from './src/utils/Router'
import { ProfilePage } from './src/pages/Profile/index.profile'
import { ProfileEditPage } from './src/pages/ProfileEdit/index.profileedit'
import { SettingsPage } from './src/pages/Settings/index.settings'
import { ErrorPage404, ErrorPage500 } from './src/pages/Error/index.error'
// import AuthController from './src/controllers/AuthController'
import { MessengerPage } from './src/pages/Messenger/index.messenger'
import { registerHandlebarsHelpers } from './src/utils/HandlebarsHelpers'

registerHandlebarsHelpers()

export enum Routes {
  Index = '/',
  Login = '/login',
  Register = '/register',
  Profile = '/profile',
  ProfileEdit = '/profileedit',
  Messenger = '/messenger',
  Settings = '/settings',
  Error = '/error',
  ErrorServer = '/error500',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
  Router.use(Routes.Login, LoginPage)
  Router.use(Routes.Register, RegisterPage)
  Router.use(Routes.Profile, ProfilePage)
  Router.use(Routes.ProfileEdit, ProfileEditPage)
  Router.use(Routes.Messenger, MessengerPage)
  Router.use(Routes.Settings, SettingsPage)
  Router.use(Routes.Error, ErrorPage404)
  Router.use(Routes.Error, ErrorPage500)

  const pathname = window.location.pathname
  const legitPathNames = Object.values(Routes).map((p) => p.toString())

  let isProtectedRoute = true

  switch (pathname) {
    case Routes.Index:
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  if (!legitPathNames.includes(pathname)) Router.go(Routes.Error)
  try {
    // await AuthController.fetchUser()
    Router.start()

    // if (!isProtectedRoute) {
    //   Router.go(Routes.Profile)
    // }
  } catch (e) {
    // Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
