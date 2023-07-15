import Block from '../../utils/Block'
import { template } from './login.templ'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
import { Tag } from '../../components/Tags/tags'
import { formDataToJson, redirect } from '../../utils/Helpers'
import { Routes } from '../../..'
import { inputsData, InputData } from '../../../public/inputsData'
import { SigninData } from '../../api/AuthAPI'
import AuthController from '../../controllers/AuthController'
import { validateForm } from '../../utils/FormValidator'

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

    const inputs = [login, password].map((d: InputData) => {
      d.regex = /^.*$/ // remove validation rules
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

    const button = new Button({
      label: 'Login',
      type: 'submit',
    })

    const link = new Link({
      label: 'Register new account',
      to: Routes.Register,
    })

    this.children.loginform = new Container({
      content: [
        new Form({
          title: 'Login',
          inputs,
          buttons: [button],
          link,
          info,
          events: {
            submit: this.loginSubmit.bind(this),
          },
        }),
      ],
      classes: ['form-container'],
    })
    // store form for validation
  }

  loginSubmit(e: any) {
    e.preventDefault()
    const form = e.target
    if (!form) return
    if (!validateForm(this.children.loginform as Block)) return
    const formData = new FormData(e.target)
    const data = formDataToJson(formData) as SigninData

    AuthController.signin(data).then((res) => {
      if (!res.success) {
        AuthController.fetchUser()
        alert(res.error.reason)
        return
      }
      redirect({ url: Routes.Profile })
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
