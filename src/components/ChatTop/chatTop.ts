import Block from '../../utils/Block.js'
import { template } from './chatTop.templ.js'
import { withStore } from '../../utils/Store.js'
import { ChatInfo } from '../../api/ChatsAPI.js'
import { User } from '../../api/AuthAPI.js'
import { Avatar } from '../Avatar/avatar.js'
import { ButtonAwesome } from '../Buttons/buttons.js'
import { Container } from '../Containers/containers.js'
// import ChatsController from '../../controllers/ChatsController.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
import store from '../../utils/Store.js'
import { Tag } from '../Tags/tags.js'
import { isEqual } from '../../utils/Helpers.js'

interface ChatTopProps extends ChatInfo {
  selected: boolean
  chat: ChatInfo
  users: User[]
  buttons: Record<string, Block>
}
export class ChatTopBase extends Block<ChatTopProps> {
  constructor(props: ChatTopProps) {
    super({ ...props, selected: true })
  }
  init() {
    if (this.props.chat) {
      this.children.avatarContainer = this.createAvatar(this.props)
    } else {
      this.props.selected = false
    }
    this.children = { ...this.children, ...this.props.buttons }
  }

  protected componentDidUpdate(oldProps: ChatTopProps, newProps: ChatTopProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      if (newProps.chat) {
        this.props.selected = true
        this.children.avatarContainer = this.createAvatar(newProps)
      } else {
        this.props.selected = false
      }
      return true
    }
    return false
  }

  private createAvatar(props: ChatTopProps) {
    const { chat, users } = props
    const { title } = chat
    const creator = users ? users.filter((u: User) => u.id == this.props.created_by)[0] : undefined
    const src = creator ? creator.avatar : null
    const usersNumber = users ? `Users: ${users.length}` : 'Users: 1'

    return new Container({
      classes: ['top-chat-avatar-container', 'blue'],
      content: [
        new Avatar({
          title,
          src,
        }),
        new Container({
          content: [
            new Tag({
              tag: 'p',
              content: title,
              classes: ['name'],
            }),
            new Tag({
              tag: 'p',
              content: usersNumber,
              classes: ['users-number'],
            }),
          ],
        }),
      ],
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

export const withSelectedChat = withStore((state) => {
  const users = state.selectedChat && state.chatsUsers ? state.chatsUsers[state.selectedChat] : []
  const selectedChatId = state.selectedChat || undefined
  const chat = selectedChatId ? store.getChatById(selectedChatId) : null
  return {
    chat,
    users,
  }
})

export const ChatTop = withSelectedChat(ChatTopBase)
