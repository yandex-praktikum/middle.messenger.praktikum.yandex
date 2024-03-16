import { navigate } from './utils'
import './style.css'
import { render } from './utils/renderDOM'
import { loginPage } from './pages/loginPage/loginPage'

document.addEventListener('DOMContentLoaded', () => {

  if (!window.location.hash) {
    render('#app', loginPage)
  } else {
    navigate()
  }
})

window.addEventListener('hashchange', navigate)
