import store from '@/core/Store.ts'
import { ChatService } from '@/services/ChatService.ts'

const chatService = new ChatService()

export class ChatController {
  public async getChats() {
    return chatService.getChats().then((resp) => {
      store.set('chats', JSON.parse(resp.response))
      return resp
    })
  }
}
