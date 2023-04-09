import * as cls from './chatList.module.scss'
import chatListTpl from './chatList.hbs'

const data = {
  linkToProfile: "Профиль",
  searchPlaceholder: "Поиск",

  chatList: [
    {
      userName: "Андрей",
      imageLink: "",
      chatDate: "10:49",
      messagePrefix: false,
      messageText: "Изображение",
      unreadAmount: 2
    },

    {
      userName: "Киноклуб",
      imageLink: "",
      chatDate: "12:00",
      messagePrefix: true,
      messageText: "стикер",
      unreadAmount: 0
    },

    {
      userName: "Илья",
      imageLink: "",
      chatDate: "15:12",
      messagePrefix: false,
      messageText: "Друзья, у меня для вас особенный выпуск новостей!...",
      unreadAmount: 4
    },

    {
      userName: "Вадим",
      imageLink: "",
      chatDate: "Пт",
      messagePrefix: true,
      messageText: "Круто!",
      unreadAmount: 4
    },

    {
      userName: "тет-а-теты",
      imageLink: "",
      chatDate: "Ср",
      messagePrefix: false,
      messageText: "И Human Interface Guidelines и Material Design рекомендуют...",
      unreadAmount: 0
    },

    {
      userName: "1, 2, 3",
      imageLink: "",
      chatDate: "Пн",
      messagePrefix: false,
      messageText: "Миллионы россиян ежедневно проводят десятки часов свое...",
      unreadAmount: 0
    },

    {
      userName: "Design Destroyer",
      imageLink: "",
      chatDate: "Пн",
      messagePrefix: false,
      messageText: "В 2008 году художник Jon Rafman  начал собирать...",
      unreadAmount: 0
    },

    {
      userName: "Day.",
      imageLink: "",
      chatDate: "1 Мая 2020",
      messagePrefix: false,
      messageText: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
      unreadAmount: 0
    },

    {
      userName: "Стас Рогозин",
      imageLink: "",
      chatDate: "12 Апр 2020",
      messagePrefix: false,
      messageText: "Можно или сегодня или завтра вечером.",
      unreadAmount: 0
    }
  ],

  class: cls
}

const ChatList = () => chatListTpl(data)

export default ChatList
