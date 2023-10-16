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
      .then((xhr) => {
        if (xhr.status === 200) {
          const chats = JSON.parse(xhr.responseText);
          Store.set('chats', chats);

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public create(data: CreateData) {
    ChatsAPI.create(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          this.request();

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public uploadAvatar(data: FormData) {
    ChatsAPI.uploadAvatar(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const { chats } = Store.getState();

          chats.forEach((chat: any) => {
            if (chat.id === data.id) {
              merge(chat, data)
            }
          })

          Store.set('chats', chats);

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
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
    const xhr = await ChatsAPI.addUsers(addUsersData);

    return xhr.responseText;
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
    const xhr = await ChatsAPI.deleteUsers(addUsersData);

    return xhr.responseText;
  }

  public async getUsers(id: number, parameters = {}) {
    const xhr = await ChatsAPI.getUsers(id, parameters);

    if (xhr.status !== 200) return;

    let res = null;

    try {
      res = JSON.parse(xhr.responseText);
    } catch (error) {
      console.error(error);
    }

    return res;
  }

  public delete(data: IdData) {
    ChatsAPI.delete(data)
      .then((xhr) => {
        if (xhr.status === 200) {
          const { result } = JSON.parse(xhr.responseText);
          const { chats } = Store.getState();
          const updatedChats = chats.filter((chat: any) => chat.id !== result.id);
          Store.set('chats', updatedChats);
          Store.set('selectedChat', null);

          return;
        }

        const { reason } = JSON.parse(xhr.responseText);
        Store.set('error', reason);
      })
      .catch((error) => {
        console.error(`${error}`);
      })
  }

  public async getToken(id: number) {
    const xhr = await ChatsAPI.getToken(id);

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

export default new ChatsController();
