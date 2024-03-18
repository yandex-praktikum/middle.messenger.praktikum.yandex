import { loginPage } from '../pages/loginPage/loginPage'
import { registerPage } from '../pages/registerPage/registerPage'
import { profilePage } from '../pages/profilePage/profilePage'
import { notFound, serverError } from '../pages/errorPage/errorPage'
import { Routes } from '../constants/routes'
import { renderDOM } from '../utils'

export default () => {
  const rootDiv = document.querySelector('#app')
  if (!rootDiv) {
    throw new Error('Нет рут элемента') 
  }

  switch (window.location.hash) {
    case Routes.main:
      break
    case Routes.profile:
      renderDOM('#app', profilePage)
      break
    case Routes.editUserdata:
      break
    case Routes.editPassword:
      break
    case Routes.login:
      renderDOM('#app', loginPage)
      break
    case Routes.register:
      renderDOM('#app', registerPage)
      break
    case Routes.notFound:
      renderDOM('#app', notFound)
      break
    case Routes.serverError:
      renderDOM('#app', serverError)
      break
    default:
      renderDOM('#app', notFound)
      break
  }
}
