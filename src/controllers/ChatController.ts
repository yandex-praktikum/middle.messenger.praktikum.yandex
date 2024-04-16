import store from '@/core/Store.ts'
import { ChatService, ChatUsersRequest } from '@/services/ChatService.ts'

const chatService = new ChatService()

export class ChatController {
  public async getChats() {
    return chatService.getChats().then((resp) => {
      store.set('chats', JSON.parse(resp.response))
      if (store.getState().chats.length) {
        store.set('selectedChat', store.getState().chats[0].id)
      }
      return resp
    })
  }

  public async getToken(chatId: number) {
    return chatService.getToken(chatId).then((resp) => {
      return JSON.parse(resp.response)
    })
  }

  public async getChatUsers(chatId: number) {
    return chatService.getChatUsers(chatId).then((resp) => {
      store.set('chatUsers', JSON.parse(resp.response))
    })
  }

  public async createChat(title: string) {
    return chatService.createChat(title).then(() => {
      this.getChats()
    })
  }

  public async addUserToChat(data: ChatUsersRequest) {
    return chatService.addUserToChat(data).then(() => {
      this.getChatUsers(data.chatId)
    })
  }

  public async deleteUserFromChat(data: ChatUsersRequest) {
    return chatService.deleteUserFromChat(data).then(() => {
      this.getChatUsers(data.chatId)
    })
  }
}
