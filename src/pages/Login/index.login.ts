import Block from '../../utils/Block'
import { template } from './login.templ'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
import { Tag } from '../../components/Tags/tags'
import { redirect } from '../../commonActions/actions'
// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'
import * as stylesDefs from '../../scss/styles.module.scss'
const styles = stylesDefs.default

export class LoginPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.props.wrapperClass = styles.wrapper

    // create Blocks for the Form
    const inputsData = [
      {
        name: 'login',
        type: 'text',
        class: '.input-square',
        placeholder: 'Login',
        autofocus: true,
      },
      {
        name: 'password',
        type: 'password',
        class: '.input-square',
        placeholder: 'Password',
      },
    ]

    const inputs = inputsData.map(
      (d) => new Input({ ...d, required: true, classes: ['input-square'] }),
    )
    // store inputs for submittion
    this.props.inputs = inputs
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
    const form = new Form({
      title: 'Login',
      inputs,
      button,
      link,
    })

    this.children.form = new Container({
      content: [form],
      classes: ['form-container'],
    })
  }

  onSubmit() {
    console.log('submit Login Form')
    const inputs = this.props.inputs
    const values = inputs.map((i: Input) => [i.getName(), i.getValue()])
    const data = Object.fromEntries(values)
    console.log(data)

    // AuthController.signin(data as SignupData)
    // redirect({ url: '/messenger' })
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
