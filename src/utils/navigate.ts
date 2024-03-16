import Handlebars from 'handlebars'
import pages from '../pages'
import { Routes } from '../constants/routes'
import { render } from './renderDOM'

export default () => {
  const rootDiv = document.querySelector('#app') as Element

  const mainPage = Handlebars.compile(pages.mainPageTmpl)({})

  // const userdata = {
  //   editInfo: false,
  //   editPassword: false,
  //   userdata: {
  //     username: 'Иван',
  //     email: 'pochta@yandex.ru',
  //     login: 'ivanivanov',
  //     firstName: 'Иван',
  //     lastName: 'Иванов',
  //     displayName: 'Иван',
  //     phone: '+7 (909) 967 30 30',
  //   },
  // }

  switch (window.location.hash) {
    case Routes.main:
      rootDiv.innerHTML = mainPage
      break
    case Routes.profile:
      break
    case Routes.editUserdata:
      break
    case Routes.editPassword:
      break
    case Routes.login:
      render('#app', pages.loginPage)
      break
    case Routes.register:
      render('#app', pages.registerPage)
      break
    case Routes.notFound:
      render('#app', pages.notFoundPage)
      break
    case Routes.serverError:
      render('#app', pages.serverError)
      break
    default:
      render('#app', pages.notFoundPage)
  }
}
