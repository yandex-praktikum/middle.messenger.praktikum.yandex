import Block from '../../utils/Block.js'
// import AuthController from '../../controllers/AuthController'
import { template, detailTemplate } from './messenger.templ.js'
import { buttonAwesome } from '../../components/Buttons/buttonAwesome.js'
import { Input } from '../../components/Input/input.js'
import { RightPanel } from './rightPanel'
import { LeftPanel } from './leftPanel.js'
// import { buttonAwesome } from '../../components/Buttons/buttonAwesome.js'
// import { Avatar } from '../../components/Avatar/Avatar.js'
import { AvatarContainer } from '../../components/Avatar/avatarContainer.js'
import data from '../../../public/data.js'
import { findIndexByKeyValue, parseDate } from '../../utils/Helpers.js'
const { profile, chats } = data
console.log(chats)
let name = 'Noah'
console.log('messages: ', name)
// get index of the active chat on the name
const selectedIndex = findIndexByKeyValue(chats, 'display_name', name)
// get messages of the chat
const selectedChat = chats[selectedIndex]
// get my avatar
const myAvatar = profile ? profile.avatar : ''
// get avatar of the person of the chat
const { avatar } = selectedChat
// complie chat messages to show in the right panel
const rightPanelMessagesData = selectedChat.messages.map((m) => {
  const thisAvatar = m.author === 'You' ? myAvatar : avatar
  return { ...m, avatar: thisAvatar }
})

const leftPaneChatsData = chats.map((chat, i) => {
  const { display_name, avatar, newCount } = chat
  const { author, date, message } = chat.messages[0]
  const selected = i === selectedIndex ? true : false
  return {
    display_name,
    selected,
    avatar,
    author,
    message,
    date,
    newCount,
  }
})

export class MessengerPage extends Block {
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
      this.children[id] = new buttonAwesome(value)
    })

    this.children.search = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Search...',
      class: 'search-input',
    })

    /// left panel
    this.children.chats = new LeftPanel({ data: leftPaneChatsData })

    // right panel
    const { avatar, display_name, newCount } = selectedChat
    this.children.topAvatarContainer = new AvatarContainer({
      avatar,
      display_name,
      newCount,
      selected: true,
    })

    this.children.messages = new RightPanel({ data: rightPanelMessagesData })
  }
  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
