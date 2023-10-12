import { APIError, HTTPClient } from "@/shared/api";
import { User } from "@/shared/api/user";
import { LoginRequest, SignupRequest, SignupResponse } from "./auth.types";

const authAPIInstance = new HTTPClient("/auth");

class AuthAPI {
  public async signup(data: SignupRequest): Promise<SignupResponse> {
    return authAPIInstance.post("/signup", { data });
  }

  public async signin(data: LoginRequest): Promise<void | APIError> {
    const response = await authAPIInstance.post("/signin", { data });
    if (response === "OK") {
      return;
    }
    throw new Error();
  }

  public async logout(): Promise<void> {
    return authAPIInstance.post("/logout");
  }

  public async getUser(): Promise<User> {
    return authAPIInstance.get("/user");
  }
}

export { AuthAPI };
