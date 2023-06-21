import Block from '../../utils/Block'
import { template } from './register.tmpl'
import { Button } from '../../components/Buttons/buttonSubmit'
import { Input } from '../../components/Input/input'
// import styles from './styles.module.pcss'
import { Link } from '../../components/Link/link'
// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'

// constructor(name, age) {
//   super(name); // Call the parent class constructor

//   this.age = age; // Add the extra property
// }

export class RegisterPage extends Block {
  constructor() {
    super({})
  }

  init() {
    const inputs = [
      {
        type: 'text',
        name: 'first_name',
        placeholder: 'Enter your name',
        required: true,
        autofocus: true,
      },
      {
        type: 'text',
        name: 'second_name',
        placeholder: 'Enter your last name',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        type: 'number',
        name: 'age',
        placeholder: 'Enter your age',
      },
      {
        type: 'text',
        name: 'city',
        placeholder: 'Enter your city',
        required: false,
      },
      {
        type: 'text',
        name: 'login',
        placeholder: 'Create your login',
        required: true,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Create new password',
        required: true,
      },
      {
        type: 'password',
        name: 'repeat_password',
        placeholder: 'Repeat password',
        required: true,
      },
    ]
    this.children.inputs = inputs.map((d) => new Input(d))

    this.children.button = new Button({
      label: 'Create account',
      events: {
        click: () => this.onSubmit(),
      },
    })

    this.children.link = new Link({
      label: 'Login into existing account',
      to: '/',
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
    console.log('render reg')
    console.log(this.props)
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
