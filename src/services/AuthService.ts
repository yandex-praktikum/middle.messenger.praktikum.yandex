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
  baseURL: string = 'https://ya-praktikum.tech/api/v2/auth'

  signin(data: LoginData) {
    return HTTPTransport.post(`${this.baseURL}/signin`, {
      body: data,
    })
  }

  signup(data: RegisterData) {
    return HTTPTransport.post(`${this.baseURL}/signup`, {
      body: data,
    })
  }

  getUser() {
    return HTTPTransport.get(`${this.baseURL}/user`, {})
  }

  logout() {
    return HTTPTransport.post(`${this.baseURL}/logout`, {})
  }
}
