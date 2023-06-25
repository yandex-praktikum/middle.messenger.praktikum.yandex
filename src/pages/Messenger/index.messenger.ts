import Block from '../../utils/Block.js'
import data from '../../../public/data.js'
import { template } from './messenger.templ.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { redirect, log } from '../../utils/Helpers.js'
import { Input } from '../../components/Input/input.js'
import {
  Container,
  ContainerScroller,
  ContainerChat,
  ContainerMessage,
  ContainerMessagersHeader,
  ContainerSendMessage,
} from '../../components/Containers/containers.js'
import { Routes } from '../../../index.js'
import * as stylesDefs from '../../scss/styles.module.scss'
const styles = stylesDefs.default

import { findIndexByKeyValue, parseDate } from '../../utils/Helpers.js'
const { profile: profiledata, chats: chatsData } = data
console.log(chatsData)
let name = 'Noah'
console.log('messages: ', name)

// get index of the active chat on the name
const selectedIndex = findIndexByKeyValue(chatsData, 'display_name', name)
// get messages of the chat
const selectedChat = chatsData[selectedIndex]
// get my avatar
const myAvatar = profiledata ? profiledata.avatar : ''
// get avatar of the person of the chat
const { avatar } = selectedChat
// complie chats to show in the left panel
const leftPaneChatsData = chatsData.map((chat, i) => {
  const { date } = chat.messages[0]
  const selected = i === selectedIndex ? true : false
  const dateFormatted = parseDate(date)
  return { ...chat, ...chat.messages[0], date: dateFormatted, selected }
})
// complie chat messages to show in the right panel
const rightPanelMessagesData = selectedChat.messages.map((m, i) => {
  const { author, date } = m
  let prevAuthor = author
  let hideAvatar = false
  if (i < selectedChat.messages.length - 1) {
    prevAuthor = selectedChat.messages[i + 1].author
  }
  prevAuthor == author && hideAvatar
  const dateFormatted = parseDate(date)

  const thisAvatar = m.author === 'You' ? myAvatar : avatar
  return { ...m, avatar: thisAvatar, date: dateFormatted, hideAvatar }
})

export class MessengerPage extends Block {
  constructor() {
    super({})
  }

  init() {
    // LEFT PANEL
    const searchContainer = new Container({
      content: [
        new Input({
          name: 'search',
          type: 'text',
          placeholder: 'Search...',
          classes: ['input-search'],
        }),
        new ButtonAwesome({
          icon: 'fas fa-search',
          title: 'Search...',
          events: {
            click: () => log('Searching....'),
          },
        }),
      ],
      classes: ['search-container'],
    })
    const buttonProfile = new ButtonAwesome({
      icon: 'fa-regular fa-user',
      title: 'Profile',
      classes: ['profile-button'],
      events: {
        click: () => redirect({ url: Routes.Profile }),
      },
    })
    const search = new Container({
      content: [searchContainer, buttonProfile],
      classes: ['tools-container'],
    })

    // create chats
    const chats = leftPaneChatsData.map((m) => new ContainerChat(m))
    const chatContainer = new ContainerScroller({
      content: chats,
    })

    this.children.leftPanel = new Container({
      content: [search, chatContainer],
      classes: ['panel', 'left-panel'],
    })

    // RIGHT PANEL
    // top toolbar with usser avatar
    const { avatar, display_name, newCount } = selectedChat
    const topContainerChat = new ContainerMessagersHeader({
      avatar,
      display_name,
      newCount,
      selected: true,
    })

    const messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))
    const messagesContainer = new ContainerScroller({
      content: messages,
    })

    const sendMessage = new ContainerSendMessage()

    this.children.rightPanel = new Container({
      content: [topContainerChat, messagesContainer, sendMessage],
      classes: ['panel', 'right-panel'],
    })
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props, styles })
  }
}
