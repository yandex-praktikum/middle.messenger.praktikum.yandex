import { routes } from '@/constants/routes'
import { ValidationsMap } from '@/constants/validations'
import connect from '@/utils/connect.ts'
import Block, { Props } from '@/core/Block'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import Link from '@/components/link/link'
import { RegisterData } from '@/services/AuthService.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import router from '@/router.ts'
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

  componentDidMount() {
    authController.getUser().then((resp) => {
      if (resp.status === 200) {
        router.go(routes.messenger)
      }
    })
  }

  render() {
    return this.compile(loginPageTemplate, this.props)
  }
}

const authController = new AuthController()

const submitHandler = (e: Event) => {
  e.preventDefault()
  if (loginForm.getValues()) {
    const values = loginForm.getValues() as RegisterData
    authController.signin(values).then((resp) => {
      if (resp instanceof XMLHttpRequest && resp.status === 200) {
        router.go(routes.messenger)
      } else {
        alert('kek')
      }
    })
  }
}

const loginForm = new Form({
  className: 'login-form dialog-form',
  events: {
    submit: submitHandler,
  },
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
  submitBtn: new Input({
    type: 'submit',
    name: 'submit',
    label: '',
    classNameInput: 'button input-submit',
    value: 'Войти',
  }),
})

const connectedLoginPage = connect(LoginPage)

export const loginPage = new connectedLoginPage({
  loginForm: loginForm,
  registerLink: new Link({
    to: routes.register,
    label: 'Нет аккаунта?',
    withId: true,
  }),
})
