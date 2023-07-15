import Block from '../../utils/Block'
import { template } from './messages.templ.js'
// import { Chat } from '../Chat/chat'
// import { Tag } from '../Tags/tags.js'
import { withStore } from '../../utils/Store'
import { isEqual, parseDate } from '../../utils/Helpers.js'
// import { ChatInfo } from '../../api/ChatsAPI'
// import ChatsController from '../../controllers/ChatsController'
import { ContainerScroller, ContainerMessage } from '../Containers/containers.js'
import store from '../../utils/Store'
import { Message } from '../../controllers/MessagesController.js'
import { User } from '../../api/AuthAPI.js'
import ChatsController from '../../controllers/ChatsController.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface MessagesProps {
  messages: Message[]
  chatUsers: User[]
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
    // console.log('messenger====>', element.scrollHeight)
    // console.log('messenger====>', element.scrollTop)
  }

  private createMessages(props: MessagesProps) {
    if (!props.messages) return []
    console.log(props.messages)
    console.log(store.getState())
    const users = props.chatUsers
    const messages = props.messages.filter((m) => m.type !== 'user connected')
    return messages.map((m: Message) => {
      const getParts = (): Record<string, string> => {
        if (!users || users.length == 0 || !m.user_id) return { firstName: '', message: '' }
        // get user the chat with
        const recepient = users.filter((user) => user.id == m.user_id)[0]
        let firstName = recepient.first_name
        const avatar = recepient.avatar ? recepient.avatar : './public/images/cactus.png'
        // get my username
        const userName = store.getUser().first_name
        if (userName == firstName) firstName = 'You'

        // const userId = store.getUser().id
        // const message = m.content.replace(
        //   ` ${userId} was added to the chat`,
        //   ' (You)  was added to the chat',
        // )
        const message = m.content
        console.log('message', message)
        return { firstName, message, avatar }
      }
      const { firstName, message, avatar } = getParts()

      return new ContainerMessage({
        author: firstName,
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
  try {
    return {
      messages: state.messages[selectedChatId],
      chatUsers: state.chatUsers[selectedChatId],
      isLoaded: false,
    }
  } catch {
    return { messages: [], chatUsers: [], isLoaded: false }
  }
})

export const Messages = withMessages(MessagesBase)
