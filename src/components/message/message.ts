import Block from '../../core/Block'
import './message.css'

// language=hbs
const MessageTemplate = `
  <div class="message">
      <div class="message__text">{{ body }}</div>
  </div>
`

export type MessageProps = {
  id: string
  body: string
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props)
    if (this.props.id === '1') {
      this.element.classList.add('message_my')
    }
  }

  render() {
    return this.compile(MessageTemplate, this.props)
  }
}
