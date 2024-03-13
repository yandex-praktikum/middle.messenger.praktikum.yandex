import Handlebars from 'handlebars'
import pages from '../pages'
import { ErrorPageContext, ProfilePageContext } from '../types'
import { Routes } from '../constants/routes'

export default () => {
  const rootDiv = document.querySelector('#app') as Element

  const mainPage = Handlebars.compile(pages.mainPageTmpl)({})
  const profilePage = (context: ProfilePageContext) =>
    Handlebars.compile(pages.profilePageTmpl)(context)
  const loginPage = Handlebars.compile(pages.loginPageTmpl)({})
  const registerPage = Handlebars.compile(pages.registerPageTmpl)({})
  const errorPage = (context: ErrorPageContext) =>
    Handlebars.compile(pages.errorPageTmpl)(context)

  switch (window.location.hash) {
    case Routes.main:
      rootDiv.innerHTML = mainPage
      break
    case Routes.profile:
      rootDiv.innerHTML = profilePage({
        editInfo: false,
        editPassword: false,
        userdata: {
          username: 'Иван',
          email: 'pochta@yandex.ru',
          login: 'ivanivanov',
          firstName: 'Иван',
          lastName: 'Иванов',
          displayName: 'Иван',
          phone: '+7 (909) 967 30 30',
        },
      })
      break
    case Routes.editUserdata:
      rootDiv.innerHTML = profilePage({
        editInfo: true,
        editPassword: false,
        userdata: {
          username: 'Иван',
          email: 'pochta@yandex.ru',
          login: 'ivanivanov',
          firstName: 'Иван',
          lastName: 'Иванов',
          displayName: 'Иван',
          phone: '+7 (909) 967 30 30',
        },
      })
      break
    case Routes.editPassword:
      rootDiv.innerHTML = profilePage({
        editInfo: false,
        editPassword: true,
        userdata: {
          username: 'Иван',
          email: 'pochta@yandex.ru',
          login: 'ivanivanov',
          firstName: 'Иван',
          lastName: 'Иванов',
          displayName: 'Иван',
          phone: '+7 (909) 967 30 30',
        },
      })
      break
    case Routes.login:
      rootDiv.innerHTML = loginPage
      break
    case Routes.register:
      rootDiv.innerHTML = registerPage
      break
    case Routes.notFound:
      rootDiv.innerHTML = errorPage({
        errorCode: '404',
        errorText: 'Не туда попали',
      })
      break
    case Routes.serverError:
      rootDiv.innerHTML = errorPage({
        errorCode: '500',
        errorText: 'Мы уже фиксим',
      })
      break
    default:
      rootDiv.innerHTML = errorPage({
        errorCode: '404',
        errorText: 'Не туда попали',
      })
  }
}
