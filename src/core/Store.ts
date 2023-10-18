import { EventBus } from "./index";
import { set } from "../utils/index"

export enum StoreEvents {
  Updated = 'updated',
  UserUpdate = 'user:update',
  ChatsUpdate = 'chats:update',
  ChatsSelected = 'chats:selected',
  ChatsMessage = 'chats:message',
  Error = 'error',
}

type GetState = {
  error: string,
  user: any,
  chats: any[],
  messages: any[],
  selectedChat: any,
}

class Store extends EventBus {
  private state = {
    error: '',
    user: {},
    chats: [],
    messages: [],
    selectedChat: null,
  };

  public getState(): GetState {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    switch (path) {
      case 'user':
        this.emit(StoreEvents.UserUpdate);
        break;
      case 'chats':
        this.emit(StoreEvents.ChatsUpdate);
        break;
      case 'selectedChat':
        this.emit(StoreEvents.ChatsSelected);
        break;
      case 'messages':
        this.emit(StoreEvents.ChatsMessage);
        break;
      case 'error':
        this.emit(StoreEvents.Error);
        break;
      default:
        this.emit(StoreEvents.Updated);
        break;
    }
  }
}

export default new Store();
