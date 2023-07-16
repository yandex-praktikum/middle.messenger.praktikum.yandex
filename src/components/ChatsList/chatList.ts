import Block from '../../utils/Block'
import { template } from './chatList.templ.js'
import { Chat } from '../Chat/chat'
import { withStore } from '../../utils/Store'
import { ChatInfo } from '../../api/ChatsAPI'
import ChatsController from '../../controllers/ChatsController'
import store from '../../utils/Store'
import * as stylesDefs from './styles.module.scss'
import { User } from '../../api/AuthAPI.js'
const styles = stylesDefs.default

interface ChatsListProps {
  chats: ChatInfo[]
  isLoaded: boolean
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props })
  }

  protected init() {
    this.children.chats = this.createChats(this.props)
  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps)

    return true
  }

  private createChats(props: ChatsListProps) {
    // console.log(props.chats)
    // console.log(store.getState().selectedChat)
    return props.chats.map((chat: ChatInfo) => {
      const selected = store.isSelectedChat(chat.id)
      const users = store.getChatUsers(chat.id)
      // console.log('CHATLIST:', chat.id, chat.title, selected)
      return new Chat({
        selected,
        chat,
        users,
        events: {
          click: () => {
            ChatsController.selectChat(chat.id)
          },
        },
      })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles })
  }
}

const withChats = withStore((state) => {
  return { chats: [...(state.chats || [])] }
})

export const ChatsList = withChats(ChatsListBase)
