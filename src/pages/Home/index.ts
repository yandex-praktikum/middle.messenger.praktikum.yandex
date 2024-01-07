import Block from '../../utils/Block'
import { render } from '../../utils/render'
import template from './homepage.hbs'

export default class Home extends Block {
  constructor() {
    super({
      login: {
        onClick: () => {
          render('login')
        },
      },
      signup: {
        onClick: () => {
          render('signup')
        },
      },
      profile: {
        onClick: () => {
          render('profile')
        },
      },
      settings: {
        onClick: () => {
          render('settings')
        },
      },
      changePass: {
        onClick: () => {
          render('password')
        },
      },
      chat: {
        onClick: () => {
          render('chat')
        },
      },
      page404: {
        onClick: () => {
          render('page404')
        },
      },
      page500: {
        onClick: () => {
          render('page500')
        },
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
