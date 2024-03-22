import { routes } from '../../constants/routes'
import Block from '../../core/Block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import Link from '../../components/link/link'
import './registerPage.css'

// language=hbs
const registerPageTemplate = `
    <div class="register dialog">
        <div class="dialog-wrapper">
            <h4 class="register__title">Регистрация</h4>
            {{{ registerForm }}}

            {{{ loginLink }}}
        </div>
    </div>
`

type RegisterPageProps = {
  registerForm: Form
  loginLink: Link
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
  registerForm: new Form({
    className: 'register-form dialog-form',
    inputs: [
      new Input({
        type: 'text',
        name: 'email',
        label: 'Почта',
        placeholder: 'Почта...',
      }),
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин...',
      }),
      new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя...',
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия...',
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон...',
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль...',
      }),
      new Input({
        type: 'password',
        name: 'password_verify',
        label: 'Пароль ещё раз',
        placeholder: 'Повторите пароль...',
      }),
    ],
    submitBtn: new Button({ label: 'Зарегистрироваться' }),
  }),
  loginLink: new Link({
    to: routes.login,
    label: 'Войти',
    withId: true,
  }),
})
