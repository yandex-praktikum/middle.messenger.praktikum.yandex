import UsersAPI from "../api/users-api";
import { Store } from "../core";

import type {
  UserData,
  PasswordData,
  SearchData,
} from "../api/users-api";

class UsersController {
  public changeProfile(data: UserData) {
    UsersAPI.changeProfile(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          const userData = JSON.parse(xhr.responseText);
          Store.set('user', userData);

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public changeAvatar(data: FormData) {
    UsersAPI.changeAvatar(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          const userData = JSON.parse(xhr.responseText);
          Store.set('user', userData);

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public changePassword(data: PasswordData) {
    UsersAPI.changePassword(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public async search(data: SearchData) {
    const xhr = await UsersAPI.search(data);

    if (xhr.status === 200) {
      return JSON.parse(xhr.responseText);
    }

    const { reason } = JSON.parse(xhr.responseText);
    Store.set('error', reason);
  }

  public async request(id: number) {
    const xhr = await UsersAPI.request(id);

    if (xhr.status !== 200) return;

    let res = null;

    try {
      res = JSON.parse(xhr.responseText);
    } catch (error) {
      console.error(error);
    }

    return res;
  }
}

export default new UsersController();
