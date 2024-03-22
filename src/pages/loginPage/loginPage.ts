import { routes } from '../../constants/routes'
import Block, { Props } from '../../core/Block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import Link from '../../components/link/link'
import './loginPage.css'

// language=hbs
const loginPageTemplate = `
    <div class="login dialog">
        <div class="wrapper dialog-wrapper">
            <h4 class="login__title">Вход</h4>
            {{{ loginForm }}}

            {{{ registerLink }}}
        </div>
    </div>
`

type LoginPageProps = {
  loginForm: Form
  registerLink: Link
} & Props

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
    className: 'login-form dialog-form',
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
    })
  }),
  registerLink: new Link({
    to: routes.register,
    label: 'Нет аккаунта?',
    withId: true,
  }),
})
