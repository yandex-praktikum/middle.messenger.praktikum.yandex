import { routes } from '@/constants/routes.ts'
import { editPasswordPage } from '@/pages/editPasswordPage/editPasswordPage.ts'
import { editUserdataPage } from '@/pages/editUserdataPage/editUserdataPage.ts'
import { notFound, serverError } from '@/pages/errorPage/errorPage.ts'
import { loginPage } from '@/pages/loginPage/loginPage.ts'
import { messengerPage } from '@/pages/messengerPage/messengerPage.ts'
import { profilePage } from '@/pages/profilePage/profilePage.ts'
import { registerPage } from '@/pages/registerPage/registerPage.ts'
import router from '@/router.ts'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  router
    .use(routes.login, loginPage)
    .use(routes.register, registerPage)
    .use(routes.messenger, messengerPage)
    .use(routes.profile, profilePage)
    .use(routes.editUserdata, editUserdataPage)
    .use(routes.editPassword, editPasswordPage)
    .use(routes.notFound, notFound)
    .use(routes.serverError, serverError)
    .start()
})
