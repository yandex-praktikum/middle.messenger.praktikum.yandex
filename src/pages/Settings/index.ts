import Block from '../../utils/Block'
import template from './settings.hbs'
import '../Profile/profile.scss'
import '../Settings/settings.scss'
import { blurValidation, submitValidation } from '../../utils/validation'

export default class Settings extends Block {
  constructor() {
    super({
      events: {
        blur: blurValidation,
        submit: submitValidation,
      },
      button: {
        type: 'submit',
      },
      inputs: [
        {
          field: 'Почта',
          name: 'email',
          value: 'london@gmail.com',
        },
        { field: 'Логин', name: 'login', value: 'JLondon' },
        { field: 'Имя', name: 'first_name', value: 'Jack' },
        { field: 'Фамилия', name: 'second_name', value: 'London' },
        { field: 'Имя в чате', name: 'display_name', value: 'JackLo' },
        { field: 'Телефон', name: 'phone', value: '+777777777777' },
      ],
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
