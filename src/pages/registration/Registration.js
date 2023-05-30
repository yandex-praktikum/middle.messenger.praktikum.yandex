import * as cls from './registration.module.scss'
import registrationTpl from './registration.hbs'
// password, phone
const data = {
  headerText: "Регистрация",
  fields: [
    {
      title: "Почта",
      placeholder: "Например: test@yandex.ru",
      name: "email",
      type: "text",
      errorText: "Почта некорректная"
    },

    {
      title: "Логин",
      placeholder: "Например: userLogin",
      name: "login",
      type: "text",
    },

    {
      title: "Имя",
      placeholder: "Например: Иван",
      name: "first_name",
      type: "text",
    },
    
    {
      title: "Фамилия",
      placeholder: "Например: Иванов",
      name: "second_name",
      type: "text",
    },

    {
      title: "Пароль",
      placeholder: "Введите пароль",
      name: "password",
      type: "password"
    },

    {
      title: "Пароль (ещё раз)",
      placeholder: "Введите пароль",
      name: "password",
      type: "password",
      errorText: "Пароли не совпадают"
    }
  ],

  buttonText: "Зарегистрироваться",
  regLinkText: "Войти",
  class: cls
}

const RegistrationTpl = () => registrationTpl(data)

export default RegistrationTpl
