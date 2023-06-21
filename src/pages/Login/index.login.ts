import Block from '../../utils/Block'
import { template } from './login.tmpl'
import { Button } from '../../components/Buttons/buttonSubmit'
import { Input } from '../../components/Input/input'
// import styles from './styles.module.pcss'
import { Link } from '../../components/Link/link'
// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'

export class LoginPage extends Block {
  constructor() {
    super({})
  }

  init() {
    const inputs = [
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

    this.children.inputs = inputs.map((d) => new Input(d))

    this.children.button = new Button({
      label: 'Login',
      events: {
        click: () => this.onSubmit(),
      },
    })

    this.children.link = new Link({
      label: 'Register new account',
      to: '/register',
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
