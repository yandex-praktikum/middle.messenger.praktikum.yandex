import store from '@/core/Store.ts'
import { ChatService, ChatUsersRequest } from '@/services/ChatService.ts'

const chatService = new ChatService()

export class ChatController {
  public async getChats() {
    return chatService
      .getChats()
      .then((resp) => {
        store.set('chats', JSON.parse(resp.response))
        if (store.getState().chats.length) {
          store.set('selectedChat', store.getState().chats[0].id)
        }
        return resp
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  public async getToken(chatId: number) {
    return chatService
      .getToken(chatId)
      .then((resp) => {
        const currentChat = store
          .getState()
          .chats.filter((chat) => chat.id === store.getState().selectedChat)[0]
        store.set('currentChat', currentChat)
        return JSON.parse(resp.response)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  public async getChatUsers(chatId: number) {
    return chatService
      .getChatUsers(chatId)
      .then((resp) => {
        store.set('chatUsers', JSON.parse(resp.response))
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  public async createChat(title: string) {
    return chatService
      .createChat(title)
      .then(() => {
        this.getChats()
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  public async deleteChat(chatId: number) {
    return chatService
      .deleteChat(chatId)
      .then(() => {
        this.getChats()
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  public async uploadChatAvatar(data: FormData) {
    return chatService.uploadChatAvatar(data).catch((error) => {
      console.log(error)
      return error
    })
  }

  public async addUserToChat(data: ChatUsersRequest) {
    return chatService.addUserToChat(data).then(() => {
      this.getChatUsers(data.chatId).catch((error) => {
        console.log(error)
        return error
      })
    })
  }

  public async deleteUserFromChat(data: ChatUsersRequest) {
    return chatService.deleteUserFromChat(data).then(() => {
      this.getChatUsers(data.chatId).catch((error) => {
        console.log(error)
        return error
      })
    })
  }
}
