import Block from '../../core/Block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import './loginPage.css'

const loginPageTemplate = `
    <div class="login dialog">
        <div class="wrapper dialog-wrapper">
            <h4 class="login__title">Вход</h4>

            <form action="" class="login-form dialog-form">
                {{{ loginInput }}}
                {{{ passwordInput }}}
                {{{ loginBtn }}}
            </form>

            <a class="link" href="#register">Нет аккаунта?</a>
        </div>
    </div>
`

type LoginPageProps = {
  loginInput: Input
  passwordInput: Input
  loginBtn: Button
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
  loginInput: new Input({
    type: 'text',
    name: 'login',
    label: 'Логин',
    placeholder: 'Логин...',
  }),
  passwordInput: new Input({
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль...',
  }),
  loginBtn: new Button({ label: 'Авторизоваться', className: 'login-btn' }),
})
