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

const usersAPIInstance = new HTTP(`${import.meta.env.VITE_BASE_URL}user/`);

class UsersAPI extends BaseAPI {
  request(id: number) {
    return usersAPIInstance.get(`${id}`);
  }

  changeProfile(data: UserData) {
    return usersAPIInstance.put(`profile`, { data });
  }

  changeAvatar(data: FormData) {
    return usersAPIInstance.put(`profile/avatar`, { data });
  }

  changePassword(data: PasswordData) {
    return usersAPIInstance.put(`password`, { data });
  }

  search(data: SearchData) {
    return usersAPIInstance.post(`search`, { data });
  }
}

export default new UsersAPI();
