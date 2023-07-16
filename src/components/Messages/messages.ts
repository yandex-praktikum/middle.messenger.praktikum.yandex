import Block from '../../utils/Block'
import { template } from './messages.templ.js'
import { withStore } from '../../utils/Store'
import { isEqual, parseDate } from '../../utils/Helpers.js'
import { ContainerScroller, ContainerMessage } from '../Containers/containers.js'
import store from '../../utils/Store'
import { Message } from '../../controllers/MessagesController.js'
import { User } from '../../api/AuthAPI.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface MessagesProps {
  messages: Message[]
  chatsUsers: User[]
  isLoaded: boolean
}

class MessagesBase extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super({ ...props })
  }

  protected init() {
    this.children.messages = new ContainerScroller({
      content: this.createMessages(this.props),
    })
  }

  protected componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      // console.log(JSON.parse(JSON.stringify(oldProps)), JSON.parse(JSON.stringify(newProps)))
      this.children.messages = new ContainerScroller({
        content: this.createMessages(this.props),
      })
      this.scrollTop()

      return true
    }
    return false
  }

  public scrollTop = () => {
    const element = this.getContent() as HTMLElement
    element.scrollTop = element.scrollHeight
  }

  private createMessages(props: MessagesProps) {
    if (!props.messages) return []
    const users = props.chatsUsers
    const messages = props.messages.filter((m) => m.type !== 'user connected')
    return messages.map((m: Message) => {
      const getParts = (m: Message): Record<string, string> => {
        if (!users || users.length == 0 || !m.user_id) return { author: '', message: '' }
        // get user the chat with
        const sender = users.filter((u) => u.id == m.user_id)[0]
        if (!sender) return { author: '', message: '' }
        const user = store.getUser()
        const author = user.id == sender.id ? 'You' : sender.first_name
        const message = m.content
        const avatar = `https://ya-praktikum.tech/api/v2/resources${sender.avatar}`
        return { author, message, avatar }
      }
      const { author, message, avatar } = getParts(m)

      return new ContainerMessage({
        author,
        avatar,
        hideAvatar: false,
        message,
        date: parseDate(m.time),
      })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles })
  }
}

const withMessages = withStore((state) => {
  const selectedChatId = state.selectedChat
  const messages = state.messages && selectedChatId ? state.messages[selectedChatId] : []
  const chatsUsers = state.chatsUsers && selectedChatId ? state.chatsUsers[selectedChatId] : []
  try {
    return {
      messages,
      chatsUsers,
      isLoaded: false,
    }
  } catch {
    return { messages: [], chatsUsers: [], isLoaded: false }
  }
})

export const Messages = withMessages(MessagesBase)
