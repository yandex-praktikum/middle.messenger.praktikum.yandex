import { ChatAPI } from '../api/chat-api';
import store from '../utils/store';
import MessagesController from './message-controller';

class ChatsController {

  constructor(private api: ChatAPI) {}

  async create(title: string) {
    await this.api.create(title);
    await this.fetchChats();
  }

  async delete(id: number){
    await this.api.delete(id);
    store.set('selectedChat', null);
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

  async addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
    await this.fetchChats();
  }

  async deleteUserFromChat(id: number, userId: number) {
    await this.api.deleteUsers(id, [userId]);
    await this.fetchChats();
  }

  async updateAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
  
  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number | string) {
    store.set('selectedChat', id);
    this.fetchChats();
  }
  
}

export default new ChatsController(new ChatAPI());;
