import Block from '../../utils/Block.js'
import { template } from './messenger.templ.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { Tag } from '../../components/Tags/tags.js'
import { Input } from '../../components/Input/input.js'
import { Button } from '../../components/Buttons/buttons.js'
import { redirect } from '../../utils/Helpers.js'
import { SearchForm } from '../../components/SearchForm/searchForm.js'
import {
  setStyles,
  isEqual,
  isEqualProxy,
  arrayLeftRightIntersect,
  parseDate,
} from '../../utils/Helpers'
import {
  Container,
  ContainerChat,
  ContainerChatProps,
  // ContainerMessage,
  ContainerMessagersHeader,
  ContainerSendMessage,
} from '../../components/Containers/containers.js'
import { Routes } from '../../../index.js'

import * as styleMainsDefs from '../../scss/styles.module.scss'
const stylesMain = styleMainsDefs.default
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

import ChatsController from '../../controllers/ChatsController.js'
import store from '../../utils/Store'

export class MessengerPage extends Block {
  constructor() {
    super({ name: 'Noah' })
  }

  init() {
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
            click: this.openCreateNewChatDialog.bind(this),
          },
        }),
      ],
      classes: ['tools-container'],
    })

    // load chats from API
    this.loadChats()

    this.children.createNewChatPopup = new Container({
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
            click: this.createNewChat.bind(this),
          },
        }),
      ],
    })

    // RIGHT PANEL
    // const topChatProps = (this.children.topContainerChat = new ContainerMessagersHeader(props))

    // this.children.messages = [
    //   new Tag({
    //     tag: 'p',
    //     content: 'Select chat to see messages',
    //     classes: ['select-chat-message'],
    //   }),
    // ]

    this.children.sendMessage = new ContainerSendMessage()
  }

  loadChats() {
    ChatsController.fetchChats()
      .then(() => {
        const chats = store.getState().chats
        this.updateChats(chats)
      })
      .finally(() => {
        this.setProps({
          isLoaded: true,
        })
      })
  }

  updateChats(chats: ContainerChatProps[]) {
    console.log('updateChats called')
    const oldChatsBlocks = this.children.chats ? (this.children.chats as Block[]) : []
    let selectedChatId: number | undefined
    const oldChatIds = oldChatsBlocks.map((b) => b.getProps('id'))
    const newChatIds = chats.map((b) => b.id)
    const [left, right, intersect] = arrayLeftRightIntersect(oldChatIds, newChatIds)
    left.forEach((id) => {
      const oldChat = oldChatsBlocks.filter((chat) => chat.getProps('id') == id)[0]
      const index = oldChatsBlocks.indexOf(oldChat)
      if (index > -1) {
        oldChatsBlocks.splice(index, 1)
      }
    })

    // update intersecting chats if necessary
    intersect.forEach((id) => {
      let oldChat = oldChatsBlocks.filter((chat) => chat.getProps('id') == id)[0]
      const oldChatProps = oldChat.getProps()
      const selected = oldChatProps.selected
      if (selected) selectedChatId = id
      const props = chats.filter((chat) => chat.id == id)[0]
      const newChat = new ContainerChat({
        events: {
          click: () => this.setSelectedChat(props.id),
        },
        ...props,
        selected,
      })
      const newChatProps = newChat.getProps()
      if (!isEqualProxy(oldChatProps, newChatProps)) {
        oldChat = new ContainerChat({
          events: {
            click: () => this.setSelectedChat(newChatProps.id),
          },
          ...newChatProps,
          selected,
        })
      }
    })

    // add new chats
    right.forEach((id) => {
      const newChatProps = chats.filter((chat) => chat.id == id)[0]
      if (!this.children.chats) {
        this.children.chats = []
      }
      const thisChats = this.children.chats as Block[]
      const props = newChatProps
      thisChats.push(
        new ContainerChat({
          events: {
            click: () => this.setSelectedChat(props.id),
          },
          ...props,
          selected: false,
        }),
      )
    })

    // add selected chat to the top
    if (!selectedChatId) selectedChatId = chats[0].id
    this.setSelectedChat(selectedChatId)
  }

  setSelectedChat(id: number) {
    console.log(id)
    ChatsController.selectChat(id)

    const thisChats = this.children.chats as Block[]
    thisChats.forEach((chat) => chat.setProps({ selected: false }))
    const selectedChat = thisChats.filter((chat) => chat.getProps('id') == id)[0]
    selectedChat.setProps({ selected: true })
    const props = selectedChat.getProps()
    if (!props.avatar) props.avatar = './public/images/cactus.png'
    props.events.click = null
    const topChat = this.children.topContainerChat as Block
    if (!topChat) {
      this.children.topContainerChat = new ContainerMessagersHeader(props)
    } else {
      topChat.setProps(props)
    }

    // TODO: this doesn't work properly, need to create proper dismount in the block
    // this.children.messages = []
    // this.children.messages = rightPanelMessagesData.map((m) => new ContainerMessage(m))
  }

  createNewChat() {
    const createNewChatContainer = this.children.createNewChatPopup as Container

    const children = createNewChatContainer.children.content as Block[]
    const input = children[1]
    const inputElement = input.getContent() as HTMLInputElement
    const title = inputElement.value
    if (title) {
      inputElement.value = ''
      this.closeCreateNewChatDialog.bind(this)()
      // ChatsController.create(title)
    }

    this.loadChats()
  }

  openCreateNewChatDialog() {
    const element = this.children.createNewChatPopup as Block
    console.log(this.children)
    const newChatPopup = element.getContent() as HTMLElement
    console.log(newChatPopup.style)
    if (newChatPopup) {
      setStyles(newChatPopup, {
        display: 'inline-block',
      })
    }
  }

  closeCreateNewChatDialog() {
    const element = this.children.createNewChatPopup as Block
    const newChatPopup = element.getContent() as HTMLElement
    if (newChatPopup) {
      setStyles(newChatPopup, {
        display: 'none',
      })
    }
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props, styles, stylesMain })
  }
}
