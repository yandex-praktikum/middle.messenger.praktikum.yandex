import { AuthAPI } from "@/shared/api/auth";
import { SigninFormModel, SignupFormModel } from "./auth.types";
import { Routes } from "@/app/providers/withRouting";

const authApi = new AuthAPI();

class AuthController {
  public async signin(data: SigninFormModel) {
    try {
      await authApi.signin(data);
      window.router.go(Routes.Messenger);
      const user = await authApi.getUser();
      window.store.set({ user });
    } catch (error) {
      const user = (await authApi.getUser()) as any;
      if (!user.reason) {
        window.store.set({ user });
        window.router.go(Routes.Messenger);
      }
    }
  }

  public async signup(data: SignupFormModel) {
    try {
      const response = (await authApi.signup(data)) as any;
      if (!response.reason) {
        window.router.go(Routes.Messenger);
        const user = await authApi.getUser();
        window.store.set({ user });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async logout() {
    try {
      await authApi.logout();
      window.store.set({ user: null });
      window.router.go(Routes.Home);
    } catch (error) {
      console.error(error);
    }
  }
}

export { AuthController };
