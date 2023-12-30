import Block from '../../utils/Block'
import template from './passwordchange.hbs'
import '../Profile/profile.scss'
import '../PasswordChange/passwordchange.scss'
import { blurValidation, submitValidation } from '../../utils/validation'

export default class PasswordChange extends Block {
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
          field: 'Старый пароль',
          type: 'password',
          name: 'old_password',
          value: '',
        },
        {
          field: 'Новый пароль',
          type: 'password',
          name: 'password',
          value: '',
        },
        {
          field: 'Повторите новый пароль',
          type: 'password',
          name: 'password',
          value: '',
        },
      ],
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
