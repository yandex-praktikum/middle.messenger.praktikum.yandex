import { Store } from "../core";
import ChatsAPI from "../api/chats-api";
import { UsersController } from "./index";
import { merge } from "../utils/index";

import type { CreateData, IdData } from "../api/chats-api";

type ActionUser = {
  chatId: number,
  login: string
}

class ChatsController {
  public request() {
    ChatsAPI.request()
      .then((res) => {
        if (res.status === 200) {
          Store.set('chats', res.response);

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public create(data: CreateData) {
    ChatsAPI.create(data)
      .then((res) => {
        if (res.status === 200) {
          this.request();

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public uploadAvatar(data: FormData) {
    ChatsAPI.uploadAvatar(data)
      .then((res) => {
        if (res.status === 200) {
          const { response: data } = res;
          const { chats } = Store.getState();

          chats.forEach((chat: any) => {
            if (chat.id === data.id) {
              merge(chat, data)
            }
          })

          Store.set('chats', chats);

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public async addUsers(item: ActionUser) {
    const { chatId, login } = item;
    const searchData = { login };
    const users: any[] = await UsersController.search(searchData);

    if (!users || users.length === 0) return;

    const foundUser = users.find(({ login: userLogin }) => userLogin === login);

    if (!foundUser) return `User with login:${login} not found`;

    const addUsersData = {
      chatId,
      users: [foundUser.id],
    }
    const res = await ChatsAPI.addUsers(addUsersData);

    return res.response;
  }

  public async deleteUsers(item: ActionUser) {
    const { chatId, login } = item;
    const users: any[] = await this.getUsers(chatId);

    if (!users || users.length === 0) return;

    const foundUser = users.find(({ login: userLogin }) => userLogin === login);

    if (!foundUser) return `User with login:${login} not found`;

    const addUsersData = {
      chatId,
      users: [foundUser.id],
    }
    const res = await ChatsAPI.deleteUsers(addUsersData);

    return res.response;
  }

  public async getUsers(id: number, parameters = {}) {
    const res = await ChatsAPI.getUsers(id, parameters);

    if (res.status !== 200) return;

    return res.response;
  }

  public delete(data: IdData) {
    ChatsAPI.delete(data)
      .then((res) => {
        if (res.status === 200) {
          const { result } = res.response;
          const { chats } = Store.getState();
          const updatedChats = chats.filter((chat: any) => chat.id !== result.id);

          Store.set('chats', updatedChats);
          Store.set('selectedChat', null);

          return;
        }

        const { reason } = res.response;
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public async getToken(id: number) {
    const res = await ChatsAPI.getToken(id);

    if (res.status !== 200) return;

    return res.response;
  }
}

export default new ChatsController();
