import { AuthAPI } from "@/shared/api/auth";
import { SigninFormModel } from "./auth.types";
import { Router } from "@/shared/model";
import { Routes } from "@/app/providers/withRouting";

const authApi = new AuthAPI();

class AuthController {
  public async signin(data: SigninFormModel) {
    try {
      await authApi.signin(data);
      window.router.go(Routes.Messenger);
      const user = await authApi.getUser();
      window.store.set({ user });
    } catch (error) {}
  }
}

export { AuthController };
