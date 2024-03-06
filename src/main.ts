import Handlebars from 'handlebars'
import pages from './pages'
import { Routes } from './constants/routes'
import registerPartials from './utils/registerPartials'
import partials from './partials'
import './style.css'

const navigate = () => {
  const rootDiv = document.querySelector('#app') as Element

  const mainPage = Handlebars.compile(pages.mainPageTmpl)({})
  const profilePage = Handlebars.compile(pages.profilePageTmpl)({
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
  const loginPage = Handlebars.compile(pages.loginPageTmpl)({})
  const registerPage = Handlebars.compile(pages.registerPageTmpl)({})
  const notFoundPage = Handlebars.compile(pages.errorPageTmpl)({
    errorCode: '404',
    errorText: 'Не туда попали',
  })
  const serverErrorPage = Handlebars.compile(pages.errorPageTmpl)({
    errorCode: '500',
    errorText: 'Мы уже фиксим',
  })

  switch (window.location.hash) {
    case Routes.main:
      rootDiv.innerHTML = mainPage
      break
    case Routes.profile:
      rootDiv.innerHTML = profilePage
      break
    case Routes.login:
      rootDiv.innerHTML = loginPage
      break
    case Routes.register:
      rootDiv.innerHTML = registerPage
      break
    case Routes.notFound:
      rootDiv.innerHTML = notFoundPage
      break
    case Routes.serverError:
      rootDiv.innerHTML = serverErrorPage
      break
    default:
      rootDiv.innerHTML = notFoundPage
  }
}

document.addEventListener('DOMContentLoaded', () => {
  registerPartials(partials)

  if (!window.location.hash) {
    const rootDiv = document.querySelector('#app') as Element
    rootDiv.innerHTML = Handlebars.compile(pages.loginPageTmpl)({})
  } else {
    navigate()
  }
})

window.addEventListener('hashchange', navigate)
