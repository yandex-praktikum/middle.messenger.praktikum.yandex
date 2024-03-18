import Block from '../../core/Block'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import './registerPage.css'

const registerPageTemplate = `
    <div class="register dialog">
        <div class="dialog-wrapper">
            <h4 class="register__title">Регистрация</h4>

            <form action="" class="register-form dialog-form">
                {{{ emailInput }}}
                {{{ loginInput }}}
                {{{ firstNameInput }}}
                {{{ secondNameInput }}}
                {{{ phoneInput }}}
                {{{ passwordInput }}}
                {{{ passwordVerifyInput }}}
                {{{ registerBtn }}}
            </form>

            <a class="link" href="#login">Войти</a>
        </div>
    </div>
`

type RegisterPageProps = {
  emailInput: Input
  loginInput: Input
  firstNameInput: Input
  secondNameInput: Input
  phoneInput: Input
  passwordInput: Input
  passwordVerifyInput: Input
  registerBtn: Button
}

class RegisterPage extends Block {
  constructor(props: RegisterPageProps) {
    super(props)
  }

  render() {
    return this.compile(registerPageTemplate, this.props)
  }
}

export const registerPage = new RegisterPage({
  emailInput: new Input({
    type: 'text',
    name: 'email',
    label: 'Почта',
    placeholder: 'Почта...',
  }),
  loginInput: new Input({
    type: 'text',
    name: 'login',
    label: 'Логин',
    placeholder: 'Логин...',
  }),
  firstNameInput: new Input({
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Имя...',
  }),
  secondNameInput: new Input({
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Фамилия...',
  }),
  phoneInput: new Input({
    type: 'text',
    name: 'phone',
    label: 'Телефон',
    placeholder: 'Телефон...',
  }),
  passwordInput: new Input({
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль...',
  }),
  passwordVerifyInput: new Input({
    type: 'password',
    name: 'password_verify',
    label: 'Пароль ещё раз',
    placeholder: 'Повторите пароль...',
  }),
  registerBtn: new Button({ label: 'Зарегистрироваться' }),
})
