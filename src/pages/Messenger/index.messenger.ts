import Block from '../../utils/Block.js'
import data from '../../../public/data.js'
import { template } from './messenger.templ.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { redirect } from '../../utils/Helpers.js'
import { SearchForm } from '../../components/SearchForm/searchForm.js'
import {
  Container,
  ContainerChat,
  ContainerMessage,
  ContainerMessagersHeader,
  ContainerSendMessage,
} from '../../components/Containers/containers.js'
import { Routes } from '../../../index.js'
import * as styleMainsDefs from '../../scss/styles.module.scss'
const stylesMain = styleMainsDefs.default
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

import { findIndexByKeyValue, parseDate } from '../../utils/Helpers.js'
const { profile: profiledata, chats: chatsData } = data
const myAvatar = profiledata ? profiledata.avatar : ''

const getChatsMessages = (index: number) => {
  // chats
  const leftPaneChatsData = chatsData.map((chat, i) => {
    const { date } = chat.messages[0]
    const selected = i === index ? true : false
    const dateFormatted = parseDate(date)
    return { ...chat, ...chat.messages[0], date: dateFormatted, selected }
  })

  // messages

  const selectedChat = chatsData[index]
  // get avatar of the person of the chat
  const { avatar } = selectedChat
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
  return { leftPaneChatsData, rightPanelMessagesData }
}

export class MessengerPage extends Block {
  constructor() {
    super({ name: 'Noah' })
  }

  init() {
    // get index of the active chat on the name
    this.props.selectedIndex = findIndexByKeyValue(chatsData, 'display_name', this.props.name)
    const { leftPaneChatsData, rightPanelMessagesData } = getChatsMessages(this.props.selectedIndex)

    // LEFT PANEL
    this.children.search = new Container({
      content: [
        new SearchForm(),
        new ButtonAwesome({
          icon: 'fa-regular fa-user',
          title: 'Profile',
          classes: ['profile-button'],
          events: {
            click: () => redirect({ url: Routes.Profile }),
          },
        }),
      ],
      classes: ['tools-container'],
    })
    this.children.chats = leftPaneChatsData.map(
      (m) =>
        new ContainerChat({
          events: {
            click: () => this.changeChat(m.display_name),
          },
          ...m,
        }),
    )

    // RIGHT PANEL
    const selectedChat = chatsData[this.props.selectedIndex]
    const { avatar, display_name, newCount } = selectedChat

    // top toolbar with usser avatar
    this.children.topContainerChat = new ContainerMessagersHeader({
      avatar,
      display_name,
      newCount,
      selected: true,
    })

    this.children.messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))

    this.children.sendMessage = new ContainerSendMessage()
  }

  changeChat(name: string) {
    this.setProps({ name })
    const oldIndex = this.props.selectedIndex
    this.props.selectedIndex = findIndexByKeyValue(chatsData, 'display_name', this.props.name)
    // update chats
    const chats = this.children.chats as Block[]
    chats[oldIndex].setProps({ selected: false, newCount: 0 })
    chats[this.props.selectedIndex].setProps({ selected: true })
    // update header messages

    const selectedChat = chatsData[this.props.selectedIndex]
    const { avatar, display_name, newCount } = selectedChat
    const topChat = this.children.topContainerChat as Block
    topChat.setProps({ avatar, display_name, newCount })
    // update messages
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
    // TODO: this doesn't work properly, need to create proper dismount in the block
    this.children.messages = []
    this.children.messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props, styles, stylesMain })
  }
}
