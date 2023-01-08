import { UserAPI } from '../api/user-api';
import { IUserInfo, IPassword } from '../utils/interfaces';
import AuthController from './auth-controller';

export class UserController {

  constructor(private api: UserAPI) {}

  async updateUser(data: IUserInfo) {
    try {
      await this.api.updateUser(data);
      await AuthController.fetchUser();
      
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data:IPassword) {
    try {
      await this.api.updatePassword(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UserController(new UserAPI());
