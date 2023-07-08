import Block from '../../utils/Block'
import { template } from './register.tmpl'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Tag } from '../../components/Tags/tags.js'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
import { inputsData, InputData } from '../../../public/inputsData'
import AuthController from '../../controllers/AuthController'

export class RegisterPage extends Block {
  constructor() {
    super({})
  }

  init() {
    AuthController.fetchUser()
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
    // "first_name": "string",
    // "second_name": "string",
    // "login": "string",
    // "email": "string",
    // "password": "string",
    // "phone": "string"

    const { first_name, second_name, login, email, password, phone } = inputsData
    const inputs = [first_name, second_name, login, email, password, phone].map(
      (d: InputData) =>
        new Input({
          ...d,
          required: true,
          validate: true,
          classes: ['input-square'],
        }),
    )
    // store inputs for validation and form submission
    this.props.inputs = inputs

    const button = new Button({
      label: 'Create account',
    })

    const link = new Link({
      label: 'Login into existing account',
      to: '/',
    })

    const form = new Form({
      title: 'Register',
      inputs,
      button,
      link,
      info,
      onSubmit: AuthController.signup.bind(AuthController),
    })

    this.children.form = new Container({
      content: [form],
      classes: ['form-container'],
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
