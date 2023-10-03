import { APIError, BaseAPI, HTTPClient } from "@/shared/api";
import { User } from "@/shared/api/user";
import { LoginRequest, SignupResponse } from "./auth.types";

const authAPIInstance = new HTTPClient("https://ya-praktikum.tech/api/v2/auth");

class AuthAPI {
  public async signup(user: User): Promise<SignupResponse> {
    return authAPIInstance.post("/signup", { data: user });
  }

  public async signin(data: LoginRequest): Promise<void | APIError> {
    return authAPIInstance.post("/signin", { data });
  }

  public async logout(): Promise<void> {
    return authAPIInstance.post("/logout");
  }
}

export { AuthAPI };
