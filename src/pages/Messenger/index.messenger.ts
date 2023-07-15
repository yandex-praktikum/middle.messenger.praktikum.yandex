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
  // isEqual,
  // isEqualProxy,
  // arrayLeftRightIntersect,
  // parseDate,
  // cloneDeep,
} from '../../utils/Helpers'
import { Container, ContainerSendMessage } from '../../components/Containers/containers.js'
import { Routes } from '../../../index.js'
import ChatsController from '../../controllers/ChatsController.js'
import store from '../../utils/Store'
import { User } from '../../api/AuthAPI.js'
import { ChatInfo } from '../../api/ChatsAPI.js'
import { ChatsList } from '../../components/ChatsList/chatlist.js'
import { Messages } from '../../components/Messages/messages.js'
import { ChatTop } from '../../components/ChatTop/chatTop.js'
import MessageController from '../../controllers/MessagesController.js'
import * as styleMainsDefs from '../../scss/styles.module.scss'
const stylesMain = styleMainsDefs.default
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

export class MessengerPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.loadChats()

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

    this.children.chats = new ChatsList({ chats: [], isLoaded: false })

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
        new Button({
          label: 'Cancel',
          classes: ['button-cancel'],
          events: {
            click: () => this.closeCreateNewChatDialog(),
          },
        }),
      ],
    })

    // RIGHT PANEL
    this.children.topChat = new ChatTop({
      selected: true,
      events: {
        addUser: this.addUserToChat.bind(this),
        deleteChat: this.deleteChat.bind(this),
      },
    })

    this.children.messages = new Messages({ messages: [], isLoaded: false })

    this.children.sendMessage = new ContainerSendMessage()
  }

  loadChats() {
    ChatsController.fetchChats().finally(() => {
      this.setProps({
        isLoaded: true,
      })
    })
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
      ChatsController.create(title)
    }
  }

  openCreateNewChatDialog() {
    const element = this.children.createNewChatPopup as Block
    const newChatPopup = element.getContent() as HTMLElement
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

  async addUserToChat() {
    const userId = 1216054
    const chatId = store.getState().selectedChat
    if (!chatId) return
    await ChatsController.addUserToChat(chatId, userId)
    const users = await ChatsController.getChatUsers(chatId)
    const { first_name, second_name } = users.filter((user: User) => user.id === userId)[0]
    const { title } = store.getChatById(chatId)

    MessageController.sendMessage(
      chatId,
      `User ${first_name} ${second_name} was addded to chat "${title}" by ${
        store.getUser().first_name
      }`,
    )
    console.log(`User ${first_name} ${second_name} was added to the chat ${chatId}, ${title}`)
  }

  deleteChat() {
    const id = store.getState().selectedChat
    if (!id) return
    const { title } = store.getChatById(id)
    if (window.confirm(`Do you want to delete chat ${title}?`)) {
      const chats = store.getChats()
      const chatsNew = chats.filter((chat: ChatInfo) => chat.id != id)
      store.set('selectedChat', chatsNew[0].id)
      store.set('chats', chatsNew)
      ChatsController.delete(id)
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles, stylesMain })
  }
}
