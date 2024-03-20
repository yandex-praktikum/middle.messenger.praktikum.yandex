import { routes } from '../../constants/routes'
import Block from '../../core/Block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import Link from '../../components/link/link'
import './loginPage.css'
import { Form } from '../../components/form/form'

const loginPageTemplate = `
    <div class="login dialog">
        <div class="wrapper dialog-wrapper">
            <h4 class="login__title">Вход</h4>

            {{{ loginForm }}}

            <a class="link" href="#register">Нет аккаунта?</a>
        </div>
    </div>
`

type LoginPageProps = {
  loginForm: Form
  registerLink: Link
}

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super(props)
  }

  render() {
    return this.compile(loginPageTemplate, this.props)
  }
}

export const loginPage = new LoginPage({
  loginForm: new Form({
    inputs: [
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин...',
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль...',
      }),
    ],
    submitBtn: new Button({
      label: 'Авторизоваться',
      className: 'login-btn',
      events: {
        click: (event) => {
          console.log(event)
        },
      },
    }),
    className: 'login-form dialog-form',
  }),
  registerLink: new Link({ to: routes.register, label: 'Нет аккаунта?' }),
})
