import Block from '../../utils/Block'
import { template } from './chat.templ.js'
import { withStore } from '../../utils/Store'
import { ChatInfo } from '../../api/ChatsAPI'
import { Avatar } from '../Avatar/avatar'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

export interface ChatProps extends ChatInfo {
  selected: boolean
  events?: {
    click: any
  }
}

export class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props })
  }
  init() {
    this.children.avatar = new Avatar({
      title: this.props.title,
      src: this.props.avatar ? this.props.avatar : './public/images/cactus.png',
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

export const withSelectedChat = withStore((state) => {
  // console.log(
  //   '===>',
  //   (state.chats || []).find(({ id }) => id === state.selectedChat),
  // )
  return {
    selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
  }
})
export const Chat = withSelectedChat(ChatBase)
