import { AvatarUpdate, UserAPI, UserUpdate } from '../api/UserAPI'
import store from '../utils/Store'

class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = new UserAPI()
  }

  async editUser(data: UserUpdate) {
    const user = await this.api.edit(data)
    console.log(user)
    store.set('user', user)
    return user
  }

  async addAvatar(data: AvatarUpdate) {
    return await this.api.addAvatar(data)
  }

  async getUserById(id: number) {
    return await this.api.getUserById(id)
  }
}

const controller = new UserController()

// @ts-ignore
window.authController = controller

export default controller
