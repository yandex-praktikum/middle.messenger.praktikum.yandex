import Block from '../../utils/Block'
import { template } from './messages.templ.js'
// import { Chat } from '../Chat/chat'
// import { Tag } from '../Tags/tags.js'
import { withStore } from '../../utils/Store'
import { isEqual, mappedObject } from '../../utils/Helpers.js'
// import { ChatInfo } from '../../api/ChatsAPI'
// import ChatsController from '../../controllers/ChatsController'
import { ContainerScroller, ContainerMessage } from '../Containers/containers.js'
import store from '../../utils/Store'
import { Message } from '../../controllers/MessagesController.js'
import { User } from '../../api/AuthAPI.js'
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
    const users = props.chatUsers
    return props.messages.map((m: Message) => {
      const name = () => {
        if (!users || users.length == 0 || !m.user_id) return ''
        const firstName = users.filter((user) => user.id == m.user_id)[0].first_name
        const userName = store.getUser().first_name
        if (userName == firstName) return 'You'
        return firstName
      }
      return new ContainerMessage({
        author: name(),
        avatar: './public/images/cactus.png',
        hideAvatar: false,
        message: m.content,
        date: m.time,
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
