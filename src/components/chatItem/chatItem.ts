import Block, { Props } from '@/core/Block'
import Avatar from '../avatar/avatar'
import './chatItem.css'

// language=hbs
const ChatItemTemplate = `
  <div class="chat-item">
    {{{ avatar }}}
    <span class="chat-item__nickname">{{{ nickname }}}</span>
    <span class="chat-item__date">{{{ datetime }}}</span>
    <span class="chat-item__message">{{{ message }}}</span>
  </div>
`

export type ChatItemProps = {
  avatar: string
  nickname: string
  message: string
  datetime: string
} & Props

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      avatar: new Avatar({
        src: props.avatar,
        alt: 'avatar',
        size: '50px',
        className: 'chat-item__avatar',
      }),
    })
  }

  render() {
    return this.compile(ChatItemTemplate, this.props)
  }
}
