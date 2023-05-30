import * as cls from './profileEdit.module.scss'
import profileEditTpl from './profileEdit.hbs'


const data = {
  name: "Иван",
  avatar: "",
  userInformation: [
    {
      title: "Почта",
      body: "pochta@yandex.ru",
      name: "email"
    },

    {
      title: "Логин",
      body: "ivanivanov",
      name: "login"
    },

    {
      title: "Имя",
      body: "Иван",
      name: "first_name"
    },

    {
      title: "Фамилия",
      body: "Иванов",
      name: "second_name"
    },

    {
      title: "Имя в чате",
      body: "Иван",
      name: "display_name"
    },

    {
      title: "Телефон",
      body: "+7 (909) 967 30 30",
      name: "phone"
    },
  ],
  buttonText: "Сохранить",
  class: cls
}


const ProfileEdit = () => profileEditTpl(data)

export default ProfileEdit
