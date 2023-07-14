import { ChatsAPI } from '../api/ChatsAPI'
// import { User } from '../api/AuthAPI'
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
    this.fetchChats()
  }

  async fetchChats() {
    const chats = await this.api.read()
    store.set('chats', chats)
    if (!store.getState().selectedChat && chats.length > 0) {
      this.selectChat(chats[0].id)
    }
    chats.forEach(async (chat) => {
      console.log(chat.id)
      const token = await this.getToken(chat.id)
      await MessagesController.connect(chat.id, token)
      // const messages = store.getState().messages
      // console.log(messages)
    })
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

    // const users = await this.getChatUsers(id)
    // const token = await this.getToken(id)
    // await MessagesController.connect(id, token).then(() => {
    //   if (store.getState().messages) {
    //     const messages = store.getState().messages
    //     console.log(`chat${id}`, messages, messages[`chat${id}`])
    //     // console.log(Object.keys(messages))
    //   }
    // })
  }
}

const controller = new ChatsController()

// @ts-ignore
window.chatsController = controller

export default controller
