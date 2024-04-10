import { UserService } from '@/services/UserService.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import { User } from '@/constants/types.ts'

const authController = new AuthController()
const userService = new UserService()

export class UserController {
  public async editProfile(userdata: Partial<User>) {
    userService.editProfile(userdata).then((resp) => {
      console.log(resp)
    })
  }

  public async editAvatar(formData: FormData) {
    userService.editAvatar(formData).then(() => {
      authController.getUser()
    })
  }
}