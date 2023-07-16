import Block from '../../utils/Block'
import { template } from './chat.templ.js'
import store, { withStore } from '../../utils/Store'
import { ChatInfo } from '../../api/ChatsAPI'
import { Avatar } from '../Avatar/avatar'

import ChatsController from '../../controllers/ChatsController.js'
import * as stylesDefs from './styles.module.scss'
import { User } from '../../api/AuthAPI.js'
import { isEqual } from '../../utils/Helpers.js'
import { Container } from '../Containers/containers.js'
import { Tag } from '../Tags/tags.js'
const styles = stylesDefs.default

export interface ChatProps {
  selected: boolean
  chat: ChatInfo
  users: User[]
  events?: {
    click: any
  }
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props })
  }
  init() {
    // console.log('CHAT:', this.props.chat.id, this.props.selected)
    this.children.avatar = this.createAvatar(this.props)
    // this.children.message = this.createMessage(this.props)
    this.children.title = this.createTitle(this.props)
  }

  // protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
  //   if (!isEqual(oldProps, newProps)) {
  //     this.children.avatar = this.createAvatar(newProps)
  //     // this.children.message = this.createMessage(newProps)
  //     this.children.title = this.createTitle(newProps)
  //   }
  //   return false
  // }

  private createAvatar(props: ChatProps) {
    const { chat, users } = props
    const title = chat ? chat.title : ''
    const creator = users.filter((chU: User) => chU.id == this.props.created_by)[0]
    const src = creator ? creator.avatar : null

    return new Avatar({
      title,
      src,
    })
  }

  private createMessage(props: ChatProps) {
    const { chat } = props
    const content = chat ? chat.last_message.content : ''
    return new Tag({
      tag: 'span',
      content,
      classes: ['message'],
    })
  }
  private createTitle(props: ChatProps) {
    const { chat } = props
    const content = chat ? chat.title : ''
    return new Tag({
      tag: 'span',
      content,
      classes: ['name-chat'],
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

// export const withSelectedChat = withStore((state) => {
//   const users = state.selectedChat && state.chatsUsers ? state.chatsUsers[state.selectedChat] : []
//   const selectedChatId = state.selectedChat || undefined
//   const chat = selectedChatId ? store.getChatById(selectedChatId) : null
//   return {
//     chat,
//     users,
//   }
// })

// export const Chat = withSelectedChat(ChatBase)
