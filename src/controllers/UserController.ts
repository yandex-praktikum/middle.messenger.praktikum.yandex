import { UserAPI, UserUpdate } from '../api/UserAPI'
import store from '../utils/Store'

class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = new UserAPI()
  }

  async editUser(data: UserUpdate) {
    const user = await this.api.edit(data)
    store.set('user', user)
    return user
  }
}

const controller = new UserController()

// @ts-ignore
window.authController = controller

export default controller
