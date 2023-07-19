import BaseAPI from './BaseAPI';
import { User } from './AuthAPI';

export interface ChatInfo {
  id: number;
  title: string;
  created_by: number;
  avatar: string | undefined | null;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(title: string) {
    return this.http.post('/', { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  async editChatAvatar(data: FormData): Promise<User | null> {
    return this.http.put('/avatar', data, 'multipart/form-data');
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get('/');
  }

  async getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  async addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  async removeUsers(id: number, users: number[]): Promise<unknown> {
    try {
      // returns null if successful
      const res = this.http.delete('/users', { users, chatId: id });
      return res;
    } catch (e) {
      return e;
    }
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}
