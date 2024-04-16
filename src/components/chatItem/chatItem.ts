import Avatar from '@/components/avatar/avatar.ts'
import { Chat } from '@/constants/types.ts'
import Block, { Props } from '@/core/Block'
import './chatItem.css'
import store from '@/core/Store.ts'
import formatMessageDate from '@/utils/formatMessageDate.ts'
import getResourceURL from '@/utils/getResourceURL.ts'

// language=hbs
const ChatItemTemplate = `
  <div class="chat-item">
    {{{ avatar }}}
    <span class="chat-item__nickname">{{{ title }}}</span>
    <span class="chat-item__date">{{{ time }}}</span>
    <span class="chat-item__message">{{{ last_message.content }}}</span>
    {{#if unreaded}}
      <span class="chat-item__unreaded">{{{ unreaded }}}</span>
    {{/if}}
  </div>
`

export type ChatItemProps = Chat & Props

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          store.set('selectedChat', props.id)
        },
      },
      time: props.last_message
        ? formatMessageDate(props.last_message.time)
        : '',
      unreaded: props.unread_count ? props.unread_count : '',
      avatar: new Avatar({
        src: props.avatar ? getResourceURL(props.avatar) : '',
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
