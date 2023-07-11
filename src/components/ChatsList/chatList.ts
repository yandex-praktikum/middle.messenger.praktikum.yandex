import Block from '../../utils/Block'
import { template } from './chatList.templ.js'
import { Chat } from '../Chat/chat'
import { withStore } from '../../utils/Store'
import { ChatInfo } from '../../api/ChatsAPI'
import ChatsController from '../../controllers/ChatsController'
import store from '../../utils/Store'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

const chats = []

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
    return props.chats.map((data) => {
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
  return { chats: [...(state.chats || [])] }
})

export const ChatsList = withChats(ChatsListBase)
