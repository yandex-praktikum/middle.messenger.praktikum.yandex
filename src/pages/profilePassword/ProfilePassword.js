import * as cls from './profilePassword.module.scss'
import profilePasswordTpl from './profilePassword.hbs'

const data = {
  userInformation: [
    {
      title: "Старый пароль",
      body: "*********",
      name: "oldPassword"
    },

    {
      title: "Новый пароль",
      body: "***********",
      name: "newPassword"
    },

    {
      title: "Повторите новый пароль",
      body: "***********",
      name: "newPassword"
    },
  ],

  buttonText: "Сохранить",
  class: cls
}

const ProfilePassword = () => profilePasswordTpl(data)

export default ProfilePassword
