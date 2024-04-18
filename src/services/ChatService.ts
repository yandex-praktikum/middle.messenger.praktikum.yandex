import { BASE_URL } from '@/constants/api.ts'
import HTTPTransport from '@/core/HTTPTransport.ts'

export type ChatUsersRequest = {
  users: number[]
  chatId: number
}

export class ChatService {
  chatsURL: string = `${BASE_URL}/chats`

  getChats() {
    return HTTPTransport.get(`${this.chatsURL}`, {})
  }

  getChatUsers(chatId: number) {
    return HTTPTransport.get(`${this.chatsURL}/${chatId}/users`, {})
  }

  getToken(chatId: number) {
    return HTTPTransport.post(`${this.chatsURL}/token/${chatId}`, {})
  }

  createChat(title: string) {
    return HTTPTransport.post(`${this.chatsURL}`, {
      body: { title },
    })
  }

  deleteChat(chatId: number) {
    return HTTPTransport.delete(`${this.chatsURL}`, {
      body: { chatId },
    })
  }

  uploadChatAvatar(data: FormData) {
    return HTTPTransport.put(`${this.chatsURL}/avatar`, {
      body: data,
    })
  }

  addUserToChat(data: ChatUsersRequest) {
    return HTTPTransport.put(`${this.chatsURL}/users`, {
      body: data,
    })
  }

  deleteUserFromChat(data: ChatUsersRequest) {
    return HTTPTransport.delete(`${this.chatsURL}/users`, {
      body: data,
    })
  }
}
