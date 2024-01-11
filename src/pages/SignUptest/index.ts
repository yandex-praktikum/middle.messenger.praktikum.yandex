import Block from '../../utils/Block'
import './signup.scss'
import template from './signup.hbs'
import { render } from '../../utils/render'
import { blurValidation, submitValidation } from '../../utils/validation'

export default class SignUp extends Block {
  constructor() {
    super({
      events: {
        submit: submitValidation,
        blur: blurValidation,
      },
      ref: {
        onClick: () => {
          render('login')
        },
      },
      pageName: 'Регистрация',
      inputs: [
        {
          type: 'text',
          placeholder: 'Почта',
          name: 'email',
        },
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
        },
        {
          type: 'text',
          placeholder: 'Имя',
          name: 'first_name',
        },
        {
          type: 'text',
          placeholder: 'Фамилия',
          name: 'second_name',
        },
        {
          type: 'text',
          placeholder: 'Телефон',
          name: 'phone',
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
        },
        {
          type: 'password',
          placeholder: 'Пароль(еще раз)',
          name: 'password',
        },
      ],
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
