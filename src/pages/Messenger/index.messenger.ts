import Block from '../../utils/Block.js'
import { template } from './messenger.templ.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { Tag } from '../../components/Tags/tags.js'
import { Input } from '../../components/Input/input.js'
import { Button } from '../../components/Buttons/buttons.js'
import { clearFormInputs, formDataToJson, redirect } from '../../utils/Helpers.js'
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
import { ChatsList } from '../../components/ChatsList/chatList.js'
import { Messages } from '../../components/Messages/messages.js'
import { ChatTop } from '../../components/ChatTop/chatTop.js'
import MessageController from '../../controllers/MessagesController.js'
import * as styleMainsDefs from '../../scss/styles.module.scss'
const stylesMain = styleMainsDefs.default
import * as stylesDefs from './styles.module.scss'
import { Form } from '../../components/Form/form.js'
const styles = stylesDefs.default

export class MessengerPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.loadChats()

    // LEFT PANEL
    const profileButton = new ButtonAwesome({
      icon: 'fa-regular fa-user',
      title: 'Profile',
      classes: ['profile-button'],
      events: {
        click: () => redirect({ url: Routes.Profile }),
      },
    })

    const createChatButton = new ButtonAwesome({
      icon: 'fa-regular fa-square-plus',
      title: 'Add new chat',
      classes: ['create-new-button'],
      events: {
        click: () => this.openPopup('createNewChatPopup'),
      },
    })

    this.children.search = new Container({
      content: [new SearchForm(), profileButton, createChatButton],
      classes: ['tools-container'],
    })

    this.children.chats = new ChatsList({ chats: [], isLoaded: false })

    // RIGHT PANEL
    const addUserButton = new ButtonAwesome({
      icon: 'fa fa-user-plus',
      title: 'Add user',
      events: {
        click: () => this.openPopup('addUserPopup'),
      },
    })

    const deleteChatButton = new ButtonAwesome({
      icon: 'fa fa-times',
      title: 'Delete chat',
      events: {
        click: () => this.deleteChat(),
      },
    })

    this.children.topChat = new ChatTop({
      selected: true,
      buttons: { addUserButton, deleteChatButton },
    })

    this.children.messages = new Messages({ messages: [], isLoaded: false })

    this.children.sendMessage = new ContainerSendMessage()

    //POPUPS
    this.children.createNewChatPopup = new Container({
      content: [
        new Container({
          content: [
            new Form({
              title: 'Create Chat',
              inputs: [
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'Enter name for the new chat',
                      for: 'title',
                    }),
                    new Input({
                      name: 'title',
                      type: 'text',
                      placeholder: 'Enter name for the new chat',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
              ],
              buttons: [
                new Button({
                  label: 'Create chat',
                  type: 'submit',
                }),
                new Button({
                  label: 'Cancel',
                  classes: ['button-cancel'],
                  events: {
                    click: () => this.closePopup('createNewChatPopup'),
                  },
                }),
              ],
              events: {
                submit: this.createNewChatSubmit.bind(this),
              },
            }),
          ],
          classes: ['form-container'],
        }),
      ],
      classes: ['overlay-container'],
    })

    this.children.addUserPopup = new Container({
      content: [
        new Container({
          content: [
            new Form({
              title: 'Add user to the chat',
              inputs: [
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'Enter user id',
                      for: 'user',
                    }),
                    new Input({
                      name: 'user',
                      type: 'number',
                      placeholder: 'Enter user id',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
              ],
              buttons: [
                new Button({
                  label: 'Add user',
                  type: 'submit',
                }),
                new Button({
                  label: 'Cancel',
                  classes: ['button-cancel'],
                  events: {
                    click: () => this.closePopup('addUserPopup'),
                  },
                }),
              ],
              events: {
                submit: this.addUserSubmit.bind(this),
              },
            }),
          ],
          classes: ['form-container'],
        }),
      ],
      classes: ['overlay-container'],
    })
  }

  loadChats() {
    ChatsController.fetchChats().finally(() => {
      this.setProps({
        isLoaded: true,
      })
    })
  }

  createNewChatSubmit(e: any) {
    e.preventDefault()
    const form = e.target
    if (!form) return
    const formData = new FormData(e.target)
    const data = formDataToJson(formData)
    const { title } = data as Record<string, string>
    if (title) {
      this.closePopup('createNewChatPopup')
      ChatsController.create(title)
    }
    clearFormInputs(e.target)
  }

  async addUserSubmit(e: any) {
    console.log(e)
    e.preventDefault()
    const form = e.target
    if (!form) return
    const formData = new FormData(e.target)
    const data = formDataToJson(formData)
    const { user } = data as Record<string, string>
    const userId = +user
    const chatId = store.getState().selectedChat
    const { title } = store.getChatById(chatId)
    this.closePopup('addUserPopup')
    try {
      await ChatsController.addUserToChat(chatId, userId)
      const users = await ChatsController.getChatUsers(chatId)
      const { first_name, second_name } = users.filter((user: User) => user.id === userId)[0]
      MessageController.sendMessage(
        chatId,
        `User ${first_name} ${second_name} was addded to chat "${title}" by ${
          store.getUser().first_name
        }`,
      )
    } catch {
      alert(`Couldn't add user with id ${userId} chat "${title}"`)
    }
    clearFormInputs(e.target)
  }

  openPopup(popupName: string) {
    const block = this.children[popupName] as Block
    const popup = block.getContent() as HTMLElement
    if (popup) {
      setStyles(popup, {
        display: 'inline-block',
      })
    }
  }

  closePopup(popupName: string) {
    const block = this.children[popupName] as Block
    const popup = block.getContent() as HTMLElement
    if (popup) {
      setStyles(popup, {
        display: 'none',
      })
    }
  }

  deleteChat() {
    const id = store.getState().selectedChat
    if (!id) return
    const { title } = store.getChatById(id)
    if (window.confirm(`Do you want to delete chat ${title}?`)) {
      ChatsController.delete(id)
      console.log('store.getChats()', store.getChats())
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles, stylesMain })
  }
}

// const userId = 1219637
// const userId = 1186003
