import { routes } from '../../constants/routes'
import Block, { Props } from '../../core/Block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import Link from '../../components/link/link'
import './loginPage.css'
import { ValidationsMap } from '../../constants/validations'

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
        validation: {
          required: true,
          regExp: ValidationsMap.login,
          errorText: 'Неверный формат логина',
        },
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль...',
        validation: {
          required: true,
          regExp: ValidationsMap.password,
          errorText: 'Неверный формат пароля',
        },
      }),
    ],
    submitBtn: new Button({
      label: 'Авторизоваться',
      className: 'login-btn',
    }),
  }),
  registerLink: new Link({
    to: routes.register,
    label: 'Нет аккаунта?',
    withId: true,
  }),
})
