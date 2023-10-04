import { AuthAPI } from "@/shared/api/auth";
import { SigninFormModel } from "./auth.types";
import { Router } from "@/shared/model";
import { Routes } from "@/app/providers/withRouting";

const authApi = new AuthAPI();

class AuthController {
  public async signin(data: SigninFormModel) {
    try {
      const response = await authApi.signin(data);
      console.log("response", response);
      if (response === "OK") {
        window.router.go(Routes.Messenger);
      }
    } catch (error) {}
  }
}

export { AuthController };
