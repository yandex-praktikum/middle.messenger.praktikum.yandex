import Avatar from '@/components/avatar/avatar.ts'
import { Message, User } from '@/constants/types.ts'
import Block from '@/core/Block'
import './message.css'
import formatMessageDate from '@/utils/formatMessageDate.ts'
import getResourceURL from '@/utils/getResourceURL.ts'

// language=hbs
const MessageTemplate = `
  {{#if isMessage}}
    <div class="message">
      <div class="message__nickname">{{ nickname }}</div>
      <div class="message__avatar">{{{ avatar }}}</div>
      <div class="message__text">{{ content }}</div>
      <div class="message__date">{{ date }}</div>
    </div>
  {{else}}
    <div>{{content}}</div>
  {{/if}}
`

export type MessageItemProps = {
  isMy: boolean
  isMessage?: boolean
  user: User
} & Message

export class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    super({
      ...props,
      avatar: new Avatar({
        src:
          props.user && props.user.avatar
            ? getResourceURL(props.user.avatar)
            : '',
        alt: props.user ? props.user.display_name : '',
        size: '32px',
      }),
      nickname: props.user ? props.user.display_name : '',
      isMessage: props.type === 'message',
      date: formatMessageDate(props.time),
    })
    if (props.isMy) {
      this.element.classList.add('message_my')
    }
  }

  render() {
    return this.compile(MessageTemplate, this.props)
  }
}
