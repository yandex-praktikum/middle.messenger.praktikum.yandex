import Block from '../../utils/Block.js'
import { template } from './messenger.templ.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { Tag } from '../../components/Tags/tags.js'
import { Input } from '../../components/Input/input.js'
import { Button } from '../../components/Buttons/buttons.js'
import { redirect } from '../../utils/Helpers.js'
import { SearchForm } from '../../components/SearchForm/searchForm.js'
import { setStyles, isEqual, parseDate } from '../../utils/Helpers'
import {
  Container,
  ContainerChat,
  ContainerChatProps,
  // ContainerMessage,
  // ContainerMessagersHeader,
  ContainerSendMessage,
} from '../../components/Containers/containers.js'
import { Routes } from '../../../index.js'

import * as styleMainsDefs from '../../scss/styles.module.scss'
const stylesMain = styleMainsDefs.default
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

import ChatsController from '../../controllers/ChatsController.js'
import store from '../../utils/Store'
// import data from '../../../public/data.js'

// const { profile: profiledata, chats: chatsData } = data
// const myAvatar = profiledata ? profiledata.avatar : ''

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
    // this.props.selectedIndex = findIndexByKeyValue(chatsData, 'title', this.props.name)
    // const { leftPaneChatsData, rightPanelMessagesData } = getChatsMessages(this.props.selectedIndex)

    const loadChats = () =>
      ChatsController.fetchChats()
        .then(() => {
          // const oldChats = self.children.chats as Block
          const newChats = store.getState().chats
          console.log('newChats ===> ', newChats)
          // if (!isEqual(oldChats, newChats))
          this.children.chats = newChats.map(
            (chat: ContainerChatProps) =>
              new ContainerChat({
                events: {
                  click: () => this.changeChat(chat.id),
                },
                ...chat,
              }),
          )
        })
        .finally(() => {
          this.setProps({
            isLoaded: true,
          })
        })

    const openCreateNewChatDialog = () => {
      const element = this.children.createNewChat as Block
      const newChatDialog = element.getContent() as HTMLElement
      if (newChatDialog) {
        setStyles(newChatDialog, {
          display: 'inline-block',
        })
      }
    }

    const closeCreateNewChatDialog = () => {
      const element = this.children.createNewChat as Block
      const newChatDialog = element.getContent() as HTMLElement
      if (newChatDialog) {
        setStyles(newChatDialog, {
          display: 'none',
        })
      }
    }

    const createNewChat = () => {
      const createNewChatContainer = this.children.createNewChat as Container

      const children = createNewChatContainer.children.content as Block[]
      const input = children[1]
      const inputElement = input.getContent() as HTMLInputElement
      const title = inputElement.value
      if (title) {
        closeCreateNewChatDialog()
        // ChatsController.create(title)
      }
      loadChats()
    }

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
        new ButtonAwesome({
          icon: 'fa-regular fa-square-plus',
          title: 'Add new chat',
          classes: ['create-new-button'],
          events: {
            click: openCreateNewChatDialog,
          },
        }),
      ],
      classes: ['tools-container'],
    })
    // declare chats
    this.children.chats = []
    // load chats from API
    loadChats()

    this.children.createNewChat = new Container({
      classes: ['new-chat-container'],
      content: [
        new Tag({
          tag: 'h2',
          content: 'Create New Chat',
        }),
        new Input({
          name: 'new-chat',
          type: 'text',
          placeholder: 'Enter name for the new chat',
          required: true,
          validate: false,
          classes: ['input-square'],
        }),
        new Button({
          label: 'Create chat',
          events: {
            click: createNewChat,
          },
        }),
      ],
    })
    // this.children.chats = leftPaneChatsData.map(
    //   (m) =>
    //     new ContainerChat({
    //       events: {
    //         click: () => this.changeChat(m.title),
    //       },
    //       ...m,
    //     }),
    // )

    // RIGHT PANEL
    // const selectedChat = chatsData[this.props.selectedIndex]
    // const { avatar, title, unread_count } = selectedChat

    // // top toolbar with usser avatar
    // this.children.topContainerChat = new ContainerMessagersHeader({
    //   avatar,
    //   title,
    //   unread_count,
    //   selected: true,
    // })

    // this.children.messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))
    this.children.messages = []

    this.children.sendMessage = new ContainerSendMessage()
  }

  changeChat(id: string) {
    console.log(id)
    const chats = this.children.chats as Block[]
    chats.forEach((chat) => chat.setProps({ selected: false }))
    const thisChat = chats.filter((chat) => chat.getProps('id') == id)[0]
    thisChat.setProps({ selected: true })

    // this.setProps({ name })
    // const oldIndex = this.props.selectedIndex
    // this.props.selectedIndex = findIndexByKeyValue(chatsData, 'title', this.props.name)
    // // update chats
    // const chats = this.children.chats as Block[]
    // chats[oldIndex].setProps({ selected: false, unread_count: 0 })
    // chats[this.props.selectedIndex].setProps({ selected: true })
    // update header messages

    // const selectedChat = chatsData[this.props.selectedIndex]
    // const { avatar, title, unread_count } = selectedChat
    // const topChat = this.children.topContainerChat as Block
    // topChat.setProps({ avatar, title, unread_count })
    // update messages
    // const rightPanelMessagesData = selectedChat.messages.map((m, i) => {
    //   const { author, date } = m
    //   let prevAuthor = author
    //   let hideAvatar = false
    //   if (i < selectedChat.messages.length - 1) {
    //     prevAuthor = selectedChat.messages[i + 1].author
    //   }
    //   prevAuthor == author && hideAvatar
    //   const dateFormatted = parseDate(date)

    //   const thisAvatar = m.author === 'You' ? myAvatar : avatar
    //   return { ...m, avatar: thisAvatar, date: dateFormatted, hideAvatar }
    // })
    // TODO: this doesn't work properly, need to create proper dismount in the block
    // this.children.messages = []
    // this.children.messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props, styles, stylesMain })
  }
}
