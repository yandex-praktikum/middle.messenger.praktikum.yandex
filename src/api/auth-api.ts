import { HTTP } from "../utils/index";
import BaseAPI from "./base-api";

type SignupData = {
  first_name: string,
  second_name: string,
  email: string,
  phone: string,
  login: string,
  password: string,
}

type SigninData = {
  login: string,
  password: string,
}

const authAPIInstance = new HTTP(`${import.meta.env.VITE_BASE_URL}auth/`);

class AuthAPI extends BaseAPI {
  signup(data: SignupData) {
    return authAPIInstance.post(`signup`, { data })
  }

  signin(data: SigninData) {
    return authAPIInstance.post(`signin`, { data })
  }

  logout() {
    return authAPIInstance.post(`logout`)
  }

  getUserInfo() {
    return authAPIInstance.get(`user`)
  }
}

export type {
  SignupData,
  SigninData,
}

export default new AuthAPI();
