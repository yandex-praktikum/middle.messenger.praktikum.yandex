import { loginPage } from '../pages/loginPage/loginPage'
import { registerPage } from '../pages/registerPage/registerPage'
import { mainPage } from '../pages/mainPage/mainPage'
import { profilePage } from '../pages/profilePage/profilePage'
import { editUserdataPage } from '../pages/editUserdataPage/editUserdataPage'
import { editPasswordPage } from '../pages/editPasswordPage/editPasswordPage'
import { notFound, serverError } from '../pages/errorPage/errorPage'
import { routes } from '../constants/routes'
import { renderDOM } from '../utils'

export default () => {
  const rootDiv = document.querySelector('#app')
  if (!rootDiv) {
    throw new Error('Нет рут элемента')
  }

  switch (window.location.hash) {
    case routes.empty:
      renderDOM('#app', loginPage)
      break
    case routes.main:
      renderDOM('#app', mainPage)
      break
    case routes.profile:
      renderDOM('#app', profilePage)
      break
    case routes.editUserdata:
      renderDOM('#app', editUserdataPage)
      break
    case routes.editPassword:
      renderDOM('#app', editPasswordPage)
      break
    case routes.login:
      renderDOM('#app', loginPage)
      break
    case routes.register:
      renderDOM('#app', registerPage)
      break
    case routes.notFound:
      renderDOM('#app', notFound)
      break
    case routes.serverError:
      renderDOM('#app', serverError)
      break
    default:
      renderDOM('#app', notFound)
      break
  }
}
