import { User, AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';

type Response = {
  success: boolean;
  user?: User | null;
  users?: User[] | null;
  error: unknown | null;
};
class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData): Promise<Response> {
    try {
      await this.api.signin(data);
      const user = await this.fetchUser();
      return {
        success: true,
        user: user.user,
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

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      const user = await this.fetchUser();
      return {
        success: true,
        user: user.user,
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

  async fetchUser(): Promise<Response> {
    try {
      const user = await this.api.read();
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

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();
      router.go('/');
    } catch (e: unknown) {
      console.error(e.message);
    }
  }
}

const controller = new AuthController();

// @ts-ignore
window.authController = controller;

export default controller;
