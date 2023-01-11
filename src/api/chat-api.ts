import BaseAPI from './base-api';
import { IUserData, IChatInfo } from '../utils/interfaces';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  addAvatar(data: FormData) {
    return this.http.put('/avatar', data);
  }

  updateAvatar(data: FormData) {
    return this.http.put('/avatar', data);
  }

  create(title: string) : Promise<IChatInfo[]> {   //
    return this.http.post('/', { title });
  }

  read(): Promise<IChatInfo[]> {
    return this.http.get('/');
  }

  
  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id});
  }
 
  getUsers(id: number): Promise<Array<IUserData & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users, chatId: id });
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatAPI();
