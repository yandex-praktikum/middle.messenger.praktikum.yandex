import Block from '../../utils/Block'
import { AvatarContainer } from '../Avatar/avatarContainer'
import { template } from './chatContainer.templ'

interface ChatContainerProps {
  avatar: string
  display_name: string
  selected: boolean
  newCount?: number
  message?: string
}

export class ChatContainer extends Block<ChatContainerProps> {
  constructor(props: ChatContainerProps) {
    super({ ...props })
  }
  init() {
    this.children.chat = new AvatarContainer(this.props)
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
