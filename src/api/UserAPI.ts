import BaseAPI from './BaseAPI'

export interface SigninData {
  login: string
  password: string
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
    super('')
  }

  edit(data: UserUpdate) {
    return this.http.put('/user/profile', data)
  }

  update = undefined
  read = undefined
  create = undefined
  delete = undefined
}

export default new UserAPI()
