import { EditPasswordData, User } from '@/constants/types.ts'
import HTTPTransport from '@/core/HTTPTransport.ts'

export class UserService {
  baseURL: string = 'https://ya-praktikum.tech/api/v2/user'

  editProfile(data: Partial<User>) {
    return HTTPTransport.put(`${this.baseURL}/profile`, {
      body: data,
    })
  }

  editAvatar(data: FormData) {
    return HTTPTransport.put(`${this.baseURL}/profile/avatar`, {
      body: data,
    })
  }

  editPassword(data: EditPasswordData) {
    return HTTPTransport.put(`${this.baseURL}/password`, {
      body: data,
    })
  }

  searchUser(login: string) {
    return HTTPTransport.post(`${this.baseURL}/search`, {
      body: { login },
    })
  }
}
