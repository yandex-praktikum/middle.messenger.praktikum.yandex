import Block from '../../utils/Block'
import { template } from './login.templ'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
import { Tag } from '../../components/Tags/tags'
import { inputsData, InputData } from '../../../public/inputsData'

// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'
// import * as stylesDefs from '../../scss/styles.module.scss'
// const styles = stylesDefs.default

export class LoginPage extends Block {
  constructor() {
    super({})
  }

  init() {
    // create Blocks for the Form
    const info = new Container({
      classes: ['warning-container'],
      content: [
        new Tag({
          tag: 'p',
          content: 'warning',
        }),
      ],
    })

    // the class of the info div be passed to the inputs for blur valiudation
    const { login, password } = inputsData
    const inputs = [login, password].map(
      (d: InputData) =>
        new Input({
          ...d,
          required: true,
          classes: ['input-square'],
        }),
    )

    const button = new Button({
      label: 'Login',
    })

    const link = new Link({
      label: 'Register new account',
      to: '/register',
    })

    const form = new Form({
      title: 'Login',
      inputs,
      button,
      link,
      info,
    })

    this.children.loginform = new Container({
      content: [form],
      classes: ['form-container'],
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
