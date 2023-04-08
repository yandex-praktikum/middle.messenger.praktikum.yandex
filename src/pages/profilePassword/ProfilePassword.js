import * as cls from './profilePassword.module.scss'
import profilePasswordTpl from './profilePassword.hbs'

const data = {
  userInformation: [
    {
      title: "Старый пароль",
      body: "*********"
    },

    {
      title: "Новый пароль",
      body: "***********"
    },

    {
      title: "Повторите новый пароль",
      body: "***********"
    },
  ],

  buttonText: "Сохранить",
  class: cls
}

const ProfilePassword = () => profilePasswordTpl(data)

export default ProfilePassword