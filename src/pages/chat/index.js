import './chat.scss'

const messages = [
  {
    'autor'    : 'Вадим',
    'timestamp': '2023-06-19 11:56:00',
    'message'  : 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
  },
  {
    'autor'    : 'Вадим',
    'timestamp': '2023-06-19 11:56:01',
    'message'  : 'message.png'
  }
]

export { default as pageChat } from './chat.hbs?raw'
