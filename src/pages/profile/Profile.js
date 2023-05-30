import * as cls from './profile.module.scss'
import profileTpl from './profile.hbs'

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

  actions: [
    {
      title: 'Изменить данные',
      link: '#/profile-edit'
    },

    {
      title: 'Изменить пароль',
      link: '#/profile-password'
    },

    {
      title: 'Выйти',
      link: '/'
    }
  ],

  class: cls
}

const Profile = () => profileTpl(data)

export default Profile
