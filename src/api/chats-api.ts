import { HTTP, queryStringify } from "../utils/index";
import BaseAPI from "./base-api";

export type CreateData = {
  title: string,
}

export type IdData = {
  chatId: number,
}

export type UsersData = {
  chatId: number,
  users: number[],
}

const chatsAPIInstance = new HTTP(`${import.meta.env.VITE_BASE_URL}chats/`);

class ChatsAPI extends BaseAPI {
  request() {
    return chatsAPIInstance.get();
  }

  create(data: CreateData) {
    return chatsAPIInstance.post('', { data });
  }

  delete(data: IdData) {
    return chatsAPIInstance.delete('', { data });
  }

  getFiles(id: number) {
    return chatsAPIInstance.get(`${id}/files`);
  }

  getArchive(parameters: { [key: string]: any }) {
    return chatsAPIInstance.get(`archive${queryStringify(parameters)}`);
  }

  archive(data: IdData) {
    return chatsAPIInstance.post(`archive`, { data });
  }

  unarchive(data: IdData) {
    return chatsAPIInstance.post(`unarchive`, { data });
  }

  getUsers(id: number, parameters = {}) {
    return chatsAPIInstance.get(`${id}/users${queryStringify(parameters)}`);
  }

  getNewMessagesCount(id: number) {
    return chatsAPIInstance.get(`new/${id}`);
  }

  uploadAvatar(data: FormData) {
    return chatsAPIInstance.put(`avatar`, { data });
  }

  addUsers(data: UsersData) {
    return chatsAPIInstance.put(`users/`, { data });
  }

  deleteUsers(data: UsersData) {
    return chatsAPIInstance.delete(`users/`, { data });
  }

  getToken(id: number) {
    return chatsAPIInstance.post(`token/${id}`);
  }
}

export default new ChatsAPI();
