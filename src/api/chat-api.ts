import BaseAPI from './base-api';
import { IUser,  IChatInfo } from '../utils/interfaces';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(chatTitle: string): Promise<IChatInfo> {
    return this.http.post('/', { title : chatTitle});
  }

  read(): Promise<IChatInfo[]> {
    return this.http.get('/');
  }

  delete(chatId: string): Promise<string> {
    return this.http.delete('/', { chatId });
  }

  getChatUsers(chatId: string): Promise<Array<IUser & { role: string }>> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(chatId: number, usersId: number): Promise<string> {
    return this.http.put('/users', { users: [usersId], chatId });
  }

  removeUserFromChat(chatId: number, usersId: number): Promise<string> {
    return this.http.delete('/users', { users: [usersId], chatId });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
