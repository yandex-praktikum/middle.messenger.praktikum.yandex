import Block from '../../utils/Block'
import { template } from './login.templ'
import { Button } from '../../components/Buttons/buttonSubmit'
import { Input } from '../../components/Input/input'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'

export class LoginPage extends Block {
  constructor() {
    super({})
  }

  init() {
    // create Blocks for the Form
    const inputsData = [
      {
        name: 'login',
        type: 'text',
        placeholder: 'Login',
        required: true,
        autofocus: true,
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        required: true,
      },
    ]

    const inputs = inputsData.map((d) => new Input(d))

    const button = new Button({
      label: 'Login',
      events: {
        click: () => this.onSubmit(),
      },
    })

    const link = new Link({
      label: 'Register new account',
      to: '/register',
    })

    // pass Form
    this.children.form = new Form({
      title: 'Login',
      inputs,
      button,
      link,
    })
  }

  onSubmit() {
    console.log('submit')
    // const values = Object.values(this.children)
    //   .filter((child) => child instanceof Input)
    //   .map((child) => [(child as Input).getName(), (child as Input).getValue()])

    // const data = Object.fromEntries(values)

    // AuthController.signin(data as SignupData)
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
