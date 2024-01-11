import Block from '../../utils/Block'
import { render } from '../../utils/render'
import template from './login.hbs'
import { blurValidation } from '../../utils/validation'
import { submitValidation } from '../../utils/validation'
import './login.scss'

export class LoginPage extends Block {
  constructor() {
    super({
      events: {
        blur: blurValidation,
        submit: submitValidation,
      },
      pageName: 'Вход',
      buttons: {
        type: 'submit',
        label: 'Войти',
      },
      ref: {
        href: '',
        onClick: () => {
          render('signup')
        },
      },

      inputs: [
        {
          type: 'text',
          value: '',
          placeholder: 'Пользователь',
          name: 'first_name',
        },
        {
          type: 'text',
          value: '',
          placeholder: 'Пароль',
          name: 'password',
        },
      ],
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
