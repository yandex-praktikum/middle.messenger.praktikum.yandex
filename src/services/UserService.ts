import { BASE_URL } from '@/constants/api.ts'
import { EditPasswordData, User } from '@/constants/types.ts'
import HTTPTransport from '@/core/HTTPTransport.ts'

export class UserService {
  userURL: string = `${BASE_URL}/user`

  editProfile(data: Partial<User>) {
    return HTTPTransport.put(`${this.userURL}/profile`, {
      body: data,
    })
  }

  editAvatar(data: FormData) {
    return HTTPTransport.put(`${this.userURL}/profile/avatar`, {
      body: data,
    })
  }

  editPassword(data: EditPasswordData) {
    return HTTPTransport.put(`${this.userURL}/password`, {
      body: data,
    })
  }

  searchUser(login: string) {
    return HTTPTransport.post(`${this.userURL}/search`, {
      body: { login },
    })
  }
}
