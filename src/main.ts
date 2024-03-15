import { navigate, registerPartials } from './utils'
import partials from './partials'
import './style.css'
import { testPage } from './pages/testPage/testPage'
import Button from './components/button/button'
import {render} from "./utils/renderDOM";

document.addEventListener('DOMContentLoaded', () => {
  registerPartials(partials)

  if (!window.location.hash) {
    render("#app", new testPage({ testButton: new Button({label: 'Lol', withId: true}) }))
  } else {
    navigate()
  }
})

// window.addEventListener('hashchange', navigate)
