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
      .then((res) => {
        if (res.status === 200) {
          Store.set('user', res.response);

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public changeAvatar(data: FormData) {
    UsersAPI.changeAvatar(data)
      .then((res) => {
        if (res.status === 200) {
          Store.set('user', res.response);

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public changePassword(data: PasswordData) {
    UsersAPI.changePassword(data)
      .then((res) => {
        if (res.status === 200) {
          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public async search(data: SearchData) {
    const res = await UsersAPI.search(data);

    if (res.status === 200) {
      return res.response;
    }

    const { reason } = res.response;
    Store.set('error', reason);
  }

  public async request(id: number) {
    const res = await UsersAPI.request(id);

    if (res.status !== 200) return;

    return res.response;
  }
}

export default new UsersController();
