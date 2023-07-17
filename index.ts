import { LoginPage } from './src/pages/Login/index.login'
import { RegisterPage } from './src/pages/Register/index.register'
import Router from './src/utils/Router'
import { ProfilePage } from './src/pages/Profile/index.profile'
import { ProfileEditPage } from './src/pages/ProfileEdit/index.profileedit'
import { SettingsPage } from './src/pages/Settings/index.settings'
import { ErrorPage404, ErrorPage500 } from './src/pages/Error/index.error'
import AuthController from './src/controllers/AuthController'
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
    .use(Routes.Login, LoginPage)
    .use(Routes.Register, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.ProfileEdit, ProfileEditPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Error, ErrorPage404)
    .use(Routes.Error, ErrorPage500)

  const pathname = window.location.pathname
  const legitPathNames = Object.values(Routes).map((p) => p.toString())

  let isProtectedRoute = true

  // set not protected routes
  switch (pathname) {
    case Routes.Index:
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  if (!legitPathNames.includes(pathname)) Router.go(Routes.Error)

  Router.start()

  const res = await AuthController.fetchUser()
  if (res.success) {
    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } else {
    console.log('index.ts catch error', res.error)

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }

  // try {
  //   await AuthController.fetchUser()
  //   if (!isProtectedRoute) {
  //     Router.go(Routes.Profile)
  //   }
  // } catch (e) {
  //   console.log('index.ts catch error', e)

  //   if (isProtectedRoute) {
  //     Router.go(Routes.Index)
  //   }
  // }
})
