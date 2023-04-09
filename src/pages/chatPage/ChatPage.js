import * as cls from './chatPage.module.scss'
import chatPageTpl from './chatPage.hbs'

import messageImage from '../../static/images/messageImage.png'

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

  chatMessages: [
    {
      date: "19 июня",
      messages: [
        {
          outgoing: false,
          image: "",
          text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          date: "11:56"
        },

        {
          outgoing: false,
          image: messageImage,
          text: "",
          date: "11:56"
        },

        {
          outgoing: true,
          image: "",
          text: "Круто!",
          readed: true,
          date: "12:00"
        }
      ]
    }
  ],

  class: cls
}
const ChatPage = () => chatPageTpl(data)

export default ChatPage
