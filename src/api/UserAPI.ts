import { User } from './AuthAPI'
import BaseAPI from './BaseAPI'

export interface SigninData {
  login: string
  password: string
}

export interface SearchUserData {
  login: string
}
export interface EditPassword {
  oldPassword: string
  newPassword: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface UserUpdate {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  async editProfile(data: UserUpdate): Promise<User | null> {
    return this.http.put('/profile', data)
  }

  async editAvatar(data: FormData): Promise<User | null> {
    return this.http.put('/profile/avatar', data, 'multipart/form-data')
  }

  async editPassword(data: EditPassword): Promise<null> {
    return await this.http.put('/password', data)
  }

  async getUserById(id: number): Promise<User | null> {
    return this.http.get(`/user/${id}`)
  }

  async getUsersByLogin(data: SearchUserData): Promise<User[] | null> {
    return this.http.post(`/search`, data)
  }

  update = undefined
  read = undefined
  create = undefined
  delete = undefined
}

export default new UserAPI()
