import Block from '../../utils/Block'
import template from './profile.hbs'
import './profile.scss'
import { render } from '../../utils/render'

export default class Profile extends Block {
  constructor() {
    super({
      refSet: {
        onClick: () => {
          render('settings')
        },
      },
      refPass: {
        onClick: () => {
          render('password')
        },
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
        { field: 'Телефон', name: 'phone', value: '+7777777' },
      ],
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
