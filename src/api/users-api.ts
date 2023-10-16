import { HTTP } from "../utils/index";
import BaseAPI from "./base-api";

export type UserData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type PasswordData = {
  oldPassword: string,
  newPassword: string,
}

export type SearchData = {
  login: string,
}

const usersAPIInstance = new HTTP();

class UsersAPI extends BaseAPI {
  private _baseURL = 'https://ya-praktikum.tech/api/v2/user/';

  request(id: number) {
    return usersAPIInstance.get(`${this._baseURL}${id}`);
  }

  changeProfile(data: UserData) {
    return usersAPIInstance.put(`${this._baseURL}profile`, { data });
  }

  changeAvatar(data: FormData) {
    const headers = new Map([['Content-Type', 'multipart/form-data']]);

    return usersAPIInstance.put(`${this._baseURL}profile/avatar`, { data, headers });
  }

  changePassword(data: PasswordData) {
    return usersAPIInstance.put(`${this._baseURL}password`, { data });
  }

  search(data: SearchData) {
    return usersAPIInstance.post(`${this._baseURL}search`, { data });
  }
}

export default new UsersAPI();
