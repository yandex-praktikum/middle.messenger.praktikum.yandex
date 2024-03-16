import { loginPage } from './loginPage/loginPage'
import { registerPage } from './registerPage/registerPage'
import { notFound, serverError } from './errorPage/errorPage'
import mainPageTmpl from './mainPage/mainPage'
import profilePageTmpl from './profilePage/profilePage'

export default {
  notFoundPage: notFound,
  serverError: serverError,
  loginPage: loginPage,
  registerPage: registerPage,
  mainPageTmpl: mainPageTmpl,
  profilePageTmpl: profilePageTmpl,
}
