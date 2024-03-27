import { routes } from '../../constants/routes'
import { ValidationsMap } from '../../constants/validations'
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
        validation: {
          required: true,
          regExp: ValidationsMap.email,
          errorText: 'Неверный формат почты',
        },
      }),
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
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя...',
        validation: {
          required: true,
          regExp: ValidationsMap.name,
          errorText: 'Неверный формат имени',
        },
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия...',
        validation: {
          required: true,
          regExp: ValidationsMap.name,
          errorText: 'Неверный формат фамилии',
        },
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон...',
        validation: {
          required: true,
          regExp: ValidationsMap.phone,
          errorText: 'Неверный формат телефона',
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
      new Input({
        type: 'password',
        name: 'password_verify',
        label: 'Пароль ещё раз',
        placeholder: 'Повторите пароль...',
        validation: {
          required: true,
          regExp: ValidationsMap.password,
          errorText: 'Неверный формат пароля',
        },
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
