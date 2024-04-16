import { EditPasswordData, User } from '@/constants/types.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import store from '@/core/Store.ts'
import { UserService } from '@/services/UserService.ts'

const authController = new AuthController()
const userService = new UserService()

export class UserController {
  public async editProfile(userdata: Partial<User>) {
    return userService
      .editProfile(userdata)
      .then((resp) => {
        store.set('userdata', resp.response)
      })
      .catch((error) => {
        return error
      })
  }

  public async editAvatar(formData: FormData) {
    userService.editAvatar(formData).then(() => {
      authController.getUser()
    })
  }

  public async editPassword(data: EditPasswordData) {
    return userService
      .editPassword(data)
      .then((resp) => {
        return resp
      })
      .catch((error) => {
        return error
      })
  }
}
