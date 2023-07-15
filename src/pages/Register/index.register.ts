import Block from '../../utils/Block'
import { template } from './register.tmpl'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Tag } from '../../components/Tags/tags.js'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
import { redirect } from '../../utils/Helpers'
import { inputsData, InputData } from '../../../public/inputsData'
import AuthController from '../../controllers/AuthController'
import { SignupData } from '../../api/AuthAPI.js'
import { Routes } from '../../../index.js'
export class RegisterPage extends Block {
  constructor() {
    super({})
  }

  init() {
    // AuthController.fetchUser()

    const info = new Container({
      classes: ['warning-container'],
      content: [
        new Tag({
          tag: 'p',
          content: 'warning',
        }),
      ],
    })

    const button = new Button({
      label: 'Create account',
    })

    const link = new Link({
      label: 'Login into existing account',
      to: '/',
    })

    const { first_name, second_name, login, email, password, phone } = inputsData
    const inputs = [first_name, second_name, login, email, password, phone].map((d: InputData) => {
      return new Container({
        classes: ['input-container'],
        content: [
          new Tag({
            tag: 'label',
            content: d.label,
            for: d.name,
          }),
          new Input({
            ...d,
            id: d.name,
            required: true,
            validate: true,
            classes: ['input-square'],
          }),
        ],
      })
    })

    this.children.form = new Container({
      content: [
        new Form({
          title: 'Register',
          inputs,
          buttons: [button],
          link,
          info,
          onSubmit: this.onSubmit.bind(this),
        }),
      ],
      classes: ['form-container'],
    })
  }

  onSubmit(data: SignupData) {
    AuthController.signup(data).then((res) => {
      if (!res.success) {
        AuthController.fetchUser()
        alert(res.error.reason)
        return
      }
      redirect({ url: Routes.Messenger })
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
