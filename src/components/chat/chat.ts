import { User } from '@/constants/types'
import Block from '@/core/Block'
import { Message, MessageProps } from '../message/message'
import './chat.css'

// language=hbs
const ChatTemplate: string = `
  <div class="chat">
    <div class="chat__user">
      {{{ avatar }}}
      <span>{{{user.displayName}}}</span>
    </div>

    <div class="chat__messages">
      {{{ messages }}}
    </div>

    <div class="chat__input">
      <button class="button-icon">
        <i class="lni lni-paperclip"></i>
      </button>
      <input type="text" class="input-round">
      <button class="button-icon">
        <i class="lni lni-arrow-left"></i>
      </button>
    </div>
  </div>
`

type ChatProps = {
  user: User
  messages: MessageProps[]
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    const messagesArr: Message[] = []
    props.messages.map((message) => {
      messagesArr.push(new Message(message))
    })
    super({ ...props, avatar: props.user.avatar, messages: messagesArr })
  }

  render() {
    return this.compile(ChatTemplate, this.props)
  }
}
