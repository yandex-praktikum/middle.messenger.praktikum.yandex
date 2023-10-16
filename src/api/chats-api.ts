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

const chatsAPIInstance = new HTTP();

class ChatsAPI extends BaseAPI {
  private _baseURL = 'https://ya-praktikum.tech/api/v2/chats/';

  request() {
    return chatsAPIInstance.get(`${this._baseURL}`);
  }

  create(data: CreateData) {
    return chatsAPIInstance.post(`${this._baseURL}`, { data });
  }

  delete(data: IdData) {
    return chatsAPIInstance.delete(`${this._baseURL}`, { data });
  }

  getFiles(id: number) {
    return chatsAPIInstance.get(`${this._baseURL}${id}/files`);
  }

  getArchive(parameters: { [key: string]: any }) {
    return chatsAPIInstance.get(`${this._baseURL}archive${queryStringify(parameters)}`);
  }

  archive(data: IdData) {
    return chatsAPIInstance.post(`${this._baseURL}archive`, { data });
  }

  unarchive(data: IdData) {
    return chatsAPIInstance.post(`${this._baseURL}unarchive`, { data });
  }

  getUsers(id: number, parameters = {}) {
    return chatsAPIInstance.get(`${this._baseURL}${id}/users${queryStringify(parameters)}`);
  }

  getNewMessagesCount(id: number) {
    return chatsAPIInstance.get(`${this._baseURL}new/${id}`);
  }

  uploadAvatar(data: FormData) {
    return chatsAPIInstance.put(`${this._baseURL}avatar`, { data });
  }

  addUsers(data: UsersData) {
    return chatsAPIInstance.put(`${this._baseURL}users/`, { data });
  }

  deleteUsers(data: UsersData) {
    return chatsAPIInstance.delete(`${this._baseURL}users/`, { data });
  }

  getToken(id: number) {
    return chatsAPIInstance.post(`${this._baseURL}token/${id}`);
  }
}

export default new ChatsAPI();
