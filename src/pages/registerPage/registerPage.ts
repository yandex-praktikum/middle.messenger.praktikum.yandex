import { RegisterData } from '@/services/AuthService.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import { routes } from '@/constants/routes'
import { ValidationsMap } from '@/constants/validations'
import connect from '@/utils/connect.ts'
import Block from '@/core/Block'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import Link from '@/components/link/link'
import router from '@/router.ts'
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

const authController = new AuthController()

const submitHandler = (e: Event) => {
  e.preventDefault()
  if (registerForm.getValues()) {
    const values = registerForm.getValues() as RegisterData
    authController.signup(values).then((resp) => {
      if (resp.status === 200) {
        router.go(routes.messenger)
      } else if(resp.status === 409) {
        registerForm.showInputError('login', 'Логин уже занят')
      }
    })
  }
}

const registerForm = new Form({
  className: 'register-form dialog-form',
  events: {
    submit: submitHandler,
  },
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
  submitBtn: new Input({
    type: 'submit',
    name: 'submit',
    label: '',
    classNameInput: 'button input-submit',
    value: 'Зарегистрироваться',
  }),
})

const connectedRegisterPage = connect(RegisterPage)

export const registerPage = new connectedRegisterPage({
  registerForm: registerForm,
  loginLink: new Link({
    to: routes.login,
    label: 'Войти',
    withId: true,
  }),
})
