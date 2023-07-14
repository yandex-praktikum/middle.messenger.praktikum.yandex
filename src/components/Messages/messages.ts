import Block from '../../utils/Block'
import { template } from './chatList.templ.js'
import { Chat } from '../Chat/chat'
import { withStore } from '../../utils/Store'
import { ChatInfo } from '../../api/ChatsAPI'
import ChatsController from '../../controllers/ChatsController'
import store from '../../utils/Store'
import { Message } from '../../controllers/MessagesController.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface MessagesProps {
  chats: Message[]
  isLoaded: boolean
}

class MessagesBase extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super({ ...props })
  }

  protected init() {
    this.children.chats = this.createChats(this.props)
  }

  protected componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
    this.children.chats = this.createChats(newProps)

    return true
  }

  private createChats(props: MessagesProps) {
    return props.messages.map((data) => {
      const selected = store.isSelectedChat(data.id)
      return new Chat({
        ...data,
        selected,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
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
  const selectedChatId = state.selectedChat
  const messages = selectedChatId ? state.messages[selectedChatId] : []
  return { messages: [...messages] }
})

export const Messages = withChats(MessagesBase)
