import { navigate, renderDOM } from './utils'
import { loginPage } from './pages/loginPage/loginPage'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  if (!window.location.hash) {
    renderDOM('#app', loginPage)
  } else {
    navigate()
  }
})

window.addEventListener('hashchange', navigate)
