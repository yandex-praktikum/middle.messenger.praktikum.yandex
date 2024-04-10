import HTTPTransport from '@/core/HTTPTransport.ts'
import { User } from '@/constants/types.ts'

export class UserService {
  baseURL: string = 'https://ya-praktikum.tech/api/v2/user'

  editProfile(data: Partial<User>) {
    return HTTPTransport.put(`${this.baseURL}/profile`, {
      data: data,
    })
  }

  editAvatar(data: FormData) {
    return HTTPTransport.put(`${this.baseURL}/profile/avatar`, {
      data: data,
    })
  }

  editPassword() {
    return HTTPTransport.put(`${this.baseURL}/password`, {})
  }

  searchUser(login: string) {
    return HTTPTransport.post(`${this.baseURL}/search`, {
      data: { login },
    })
  }
}
