import { ChatsAPI } from '../api/chat-api';
import store from '../utils/store';
import MessagesController from './message-controller';

class ChatsController {

  constructor(private api: ChatsAPI) {}

  async createChat(ChatTitle: string) {
    await this.api.create(ChatTitle);
    await this.fetchChats();
  }

  async deleteChat(chatId: string){
    await this.api.delete(chatId);
    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async addUserToChat(chatId: number, userId: number) {
    this.api.addUserToChat(chatId, userId);
    await this.fetchChats();
  }

  async removeUserFromChat(chatId: number, userId: number) {
    await this.api.removeUserFromChat(chatId, userId);
    await this.fetchChats();
  }
  
  getToken(chatId: number) {
    return this.api.getToken(chatId);
  }

  selectChat(chatId: number | string) {
    store.set('selectedChat', chatId);
  }
  
}

export default new ChatsController(new ChatsAPI());;
