import * as cls from './login.module.scss'
import loginTpl from './login.hbs'

const data = {
  headerText: "Вход",
  fields: [
    {
      title: "Логин",
      placeholder: "Например: userLogin",
      name: "login",
      type: "text",
      errorText: "Неверный логин"
    },

    {
      title: "Пароль",
      placeholder: "Введите пароль",
      name: "password",
      type: "password",
      errorText: "Неверный пароль"
    }
  ],

  buttonText: "Войти",
  regLinkText: "Нет аккаунта?",
  class: cls
}

const Login = () => loginTpl(data)

export default Login
