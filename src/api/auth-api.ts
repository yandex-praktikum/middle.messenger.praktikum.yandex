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

const authAPIInstance = new HTTP();

class AuthAPI extends BaseAPI {
  private _baseURL = 'https://ya-praktikum.tech/api/v2/auth/';

  signup(data: SignupData) {
    return authAPIInstance.post(`${this._baseURL}signup`, { data })
  }

  signin(data: SigninData) {
    return authAPIInstance.post(`${this._baseURL}signin`, { data })
  }

  logout() {
    return authAPIInstance.post(`${this._baseURL}logout`)
  }

  getUserInfo() {
    return authAPIInstance.get(`${this._baseURL}user`)
  }
}

export type {
  SignupData,
  SigninData,
}

export default new AuthAPI();
