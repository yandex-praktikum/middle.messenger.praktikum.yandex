import Block from '../../utils/Block'
import template from './chatPage.hbs'
import { submitValidation } from '../../utils/validation'
import './chat.scss'

export default class ChatPage extends Block {
  constructor() {
    super({
      events: {
        submit: submitValidation,
      },
      dialogs: [
        {
          src_avatar: '../../images/photo_missed.jpg',
          name: 'Irina',
          last_message: 'Привет',
          message_time: '22:55',
          message_count: 1,
        },
        {
          src_avatar: '../../images/photo_missed.jpg',
          name: 'Denis',
          last_message: 'Как дела',
          message_time: '22:55',
          message_count: 2,
        },
      ],
      src_avatar: '../../images/photo_missed.jpg',
      name: 'Irina',
      message_date: '22 December',
      messages: {
        sent_message: 'Как дела',
        arrived_message: 'Привет',
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
