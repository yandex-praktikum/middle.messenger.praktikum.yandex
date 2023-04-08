import * as cls from './profileEdit.module.scss'
import profileEditTpl from './profileEdit.hbs'


const data = {
  name: "Иван",
  avatar: "",
  userInformation: [
    {
      title: "Почта",
      body: "pochta@yandex.ru"
    },

    {
      title: "Логин",
      body: "ivanivanov"
    },

    {
      title: "Имя",
      body: "Иван"
    },

    {
      title: "Фамилия",
      body: "Иванов"
    },

    {
      title: "Имя в чате",
      body: "Иван"
    },

    {
      title: "Телефон",
      body: "+7 (909) 967 30 30"
    },
  ],
  buttonText: "Сохранить",
  class: cls
}


const ProfileEdit = () => profileEditTpl(data)

export default ProfileEdit