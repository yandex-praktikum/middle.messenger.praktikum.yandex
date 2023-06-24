import Block from '../../utils/Block.js'
import { template } from './messagesFooter.templ.js'
import { ButtonAwesome } from '../../components/Buttons/ButtonAwesome.js'

export class MessengerFooter extends Block {
  constructor() {
    super({})
  }

  init() {
    const buttons = {
      search: {
        icon: 'fas fa-search',
        title: 'Search...',
        url: '',
        cl: 'search-button',
      },
      profile: {
        icon: 'fa-regular fa-user',
        title: 'Profile',
        url: '/profile',
        cl: 'profile-button',
      },
      send: {
        icon: 'fa-regular fa-paper-plane',
        title: 'Send',
        url: '',
        cl: 'send-button',
      },
      image: {
        icon: 'fa-regular fa-image',
        title: 'Attach Image',
        url: '',
        cl: 'image-button',
      },
      attachment: {
        icon: 'fa-solid fa-paperclip',
        title: 'Attach document',
        url: '',
        cl: 'attach-button',
      },
      settings: {
        icon: 'fa-solid fa-bars',
        title: 'Settings',
        url: '',
        cl: 'settings-button',
      },
    }

    Object.entries(buttons).forEach(([key, value]) => {
      const id = `button-${key}`
      this.children[id] = new ButtonAwesome(value)
    })
  }
  render() {
    console.log(this.props)
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
