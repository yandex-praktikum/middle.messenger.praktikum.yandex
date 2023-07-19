import { User } from '../api/AuthAPI';
import {
  UserAPI,
  UserUpdate,
  EditPassword,
  SearchUserData,
} from '../api/UserAPI';
import store from '../utils/Store';

type Response = {
  success: boolean;
  user?: User | null;
  users?: User[] | null;
  error: unknown | null;
};
class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async editProfile(data: UserUpdate): Promise<Response> {
    try {
      const user = await this.api.editProfile(data);
      store.set('user', user);
      return {
        success: true,
        user,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  async editAvatar(data: FormData): Promise<Response> {
    try {
      const user = await this.api.editAvatar(data);
      store.set('user', user);

      return {
        success: true,
        user,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  async editPassword(data: EditPassword): Promise<Response> {
    try {
      await this.api.editPassword(data);
      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error,
      };
    }
  }
  /// other chat users
  async getUserById(id: number): Promise<Response> {
    try {
      const user = await this.api.getUserById(id);
      return {
        success: true,
        user,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  async getUsersByLogin(data: SearchUserData): Promise<Response> {
    try {
      const users = await this.api.getUsersByLogin(data);
      return {
        success: true,
        users,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        users: null,
        error,
      };
    }
  }
}

const controller = new UserController();

// @ts-ignore
window.authController = controller;

export default controller;
