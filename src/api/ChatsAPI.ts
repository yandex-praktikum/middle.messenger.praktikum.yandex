import BaseAPI from './BaseAPI'
import { User } from './AuthAPI'

export interface ChatInfo {
  id: number
  title: string
  created_by: number
  avatar: string
  unread_count: number
  last_message: {
    user: User
    time: string
    content: string
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  create(title: string) {
    return this.http.post('/', { title })
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id })
  }

  read(): Promise<ChatInfo[]> {
    console.log(this)
    return this.http.get('/')
  }

  async getUsers(id: number): Promise<Array<User & { role: string }>> {
    const response = await this.http.get(`/${id}/users`)
    return response
  }

  async addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id })
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`)

    return response.token
  }

  update = undefined
}
