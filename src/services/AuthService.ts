import { BASE_URL } from '@/constants/api.ts'
import HTTPTransport from '@/core/HTTPTransport.ts'

export type RegisterData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type LoginData = {
  login: string
  password: string
}

export class AuthService {
  authURL: string = `${BASE_URL}/auth`

  signin(data: LoginData) {
    return HTTPTransport.post(`${this.authURL}/signin`, {
      body: data,
    })
  }

  signup(data: RegisterData) {
    return HTTPTransport.post(`${this.authURL}/signup`, {
      body: data,
    })
  }

  getUser() {
    return HTTPTransport.get(`${this.authURL}/user`, {})
  }

  logout() {
    return HTTPTransport.post(`${this.authURL}/logout`, {})
  }
}
