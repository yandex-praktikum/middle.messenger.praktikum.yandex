import { set } from './Helpers'
import { EventBus } from './EventBus'
import Block from './Block'
import { User } from '../api/AuthAPI'
import { ChatInfo } from '../api/ChatsAPI'
import { Message } from '../controllers/MessagesController'

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  user: User
  chats: ChatInfo[]
  messages: Record<number, Message[]>
  chatUsers: Record<number, User[]>
  selectedChat?: number
}
const setNested = (object: Record<string, any>, path: string, value: any): void => {
  let schema = object // a moving reference to internal objects within obj
  const pList = path.split('.')
  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }
  schema[pList[len - 1]] = value
}

export class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)
    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }

  /// commmon store methods
  public setNested(keypath: string, data: unknown) {
    setNested(this.state, keypath, data)
    this.emit(StoreEvents.Updated, this.getState())
  }
  public getChatById(id: number) {
    return store.getState().chats.filter((chat: ChatInfo) => chat.id === id)[0] ?? {}
  }
  public getUser() {
    return this.getState().user ?? {}
  }
  public getChats() {
    return this.getState().chats ?? []
  }
  public getChatUsers() {
    const id = this.getState().selectedChat
    const chat = this.getChatById(id)
    console.log('===>', id, chat, chat.id, this.getState().chatsUsers)
    if (!this.getState().chatsUsers) return []
    return this.getState().chatsUsers[chat.id] || []
  }
  public getMessages() {
    return this.getState().messages ?? []
  }
  public isSelectedChat(id: number) {
    return store.getState().selectedChat === id
  }
}

const store = new Store()

// @ts-ignore
window.store = store

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())

        super({ ...(props as P), ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

export default store
