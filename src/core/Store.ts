import { MessageItemProps } from '@/components/message/message.ts'
import { initialState } from '@/constants/initialState.ts'
import { Chat, User } from '@/constants/types.ts'
import EventBus from './EventBus.ts'

export enum StoreEvents {
  UPDATED = 'updated',
}

function set<K extends keyof StateType>(
  object: StateType,
  path: K,
  value: StateType[K]
): StateType {
  if (path in object) {
    object[path] = value
  }
  return object
}

export type StateType = {
  userdata: User
  chats: Chat[]
  selectedChat: number
  messages: MessageItemProps[]
  chatUsers: User[]
}

class Store extends EventBus {
  private state: StateType = initialState

  public getState() {
    return this.state
  }

  public set<K extends keyof StateType>(path: K, value: StateType[K]) {
    set(this.state, path, value)
    this.emit(StoreEvents.UPDATED)
  }
}

export default new Store()
