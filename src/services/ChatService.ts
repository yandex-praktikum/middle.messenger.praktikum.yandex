import HTTPTransport from '@/core/HTTPTransport.ts'

export type ChatUsersRequest = {
  users: number[]
  chatId: number
}

export class ChatService {
  baseURL: string = 'https://ya-praktikum.tech/api/v2/chats'

  getChats() {
    return HTTPTransport.get(`${this.baseURL}`, {})
  }

  getChatUsers(chatId: number) {
    return HTTPTransport.get(`${this.baseURL}/${chatId}/users`, {})
  }

  getToken(chatId: number) {
    return HTTPTransport.post(`${this.baseURL}/token/${chatId}`, {})
  }

  createChat(title: string) {
    return HTTPTransport.post(`${this.baseURL}`, {
      body: { title },
    })
  }

  deleteChat(chatId: number) {
    return HTTPTransport.delete(`${this.baseURL}`, {
      body: { chatId },
    })
  }

  addUserToChat(data: ChatUsersRequest) {
    return HTTPTransport.put(`${this.baseURL}/users`, {
      body: data,
    })
  }

  deleteUserFromChat(data: ChatUsersRequest) {
    return HTTPTransport.delete(`${this.baseURL}/users`, {
      body: data,
    })
  }
}
