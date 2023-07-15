import { ChatsAPI } from '../api/ChatsAPI'
// import { User } from '../api/AuthAPI'
import { ChatInfo } from '../api/ChatsAPI'
import UserController from '../controllers/UserController'
// import AuthController from './AuthController'
import store from '../utils/Store'
import MessagesController from './MessagesController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = new ChatsAPI()
  }

  // create chat
  async create(title: string) {
    await this.api.create(title)
    const newChats = await this.api.read()
    const oldChats = store.getChats()
    const oldChatsIds = oldChats.map((chat: ChatInfo) => chat.id)
    const newChat = newChats.filter((chat) => !oldChatsIds.includes(chat.id))[0]
    store.set('chats', [newChat, ...oldChats])
    const token = await this.getToken(newChat.id)
    await MessagesController.connect(newChat.id, token)
    return store.getChats()
  }

  async fetchChats() {
    const chats = await this.api.read()
    store.set('chats', chats)
    if (!store.getState().selectedChat && chats.length > 0) {
      this.selectChat(chats[0].id)
    }
    chats.forEach(async (chat) => {
      const token = await this.getToken(chat.id)
      // this is very long, but swagger doesn't support complex requests to JOIN data
      await MessagesController.connect(chat.id, token)
      const chatUsersIds = await this.getChatUsers(chat.id)
      store.set(`chatUsers.${chat.id}`, chatUsersIds)
    })
    // console.log(store.getState())
    return chats
  }

  async addUserToChat(id: number, userId: number) {
    return this.api.addUsers(id, [userId])
  }

  async delete(id: number) {
    await this.api.delete(id)
  }

  async getChatUsers(id: number) {
    return this.api.getUsers(id)
  }

  getToken(id: number) {
    return this.api.getToken(id)
  }

  async selectChat(id: number) {
    store.set('selectedChat', id)
  }
}

const controller = new ChatsController()

// @ts-ignore
window.chatsController = controller

export default controller
