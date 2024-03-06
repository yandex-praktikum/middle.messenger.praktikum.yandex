import Handlebars from 'handlebars'
import pages from './pages'
import { navigate, registerPartials } from './utils'
import partials from './partials'
import './style.css'

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
