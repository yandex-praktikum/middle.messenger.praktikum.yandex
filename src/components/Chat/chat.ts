import Block from '../../utils/Block'
import { template } from './chat.templ.js'
import { ChatInfo } from '../../api/ChatsAPI'
import { Avatar } from '../Avatar/avatar'
import { User } from '../../api/AuthAPI.js'
import { Tag } from '../Tags/tags.js'
import * as stylesDefs from './styles.module.scss'
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
    this.children.title = this.createTitle(this.props)
  }

  private createAvatar(props: ChatProps) {
    const { chat, users } = props
    const title = chat ? chat.title : ''
    const creator = users.filter((chU: User) => chU.id == this.props.chat.created_by)[0]
    const src = creator ? creator.avatar : null

    return new Avatar({
      title,
      src,
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
