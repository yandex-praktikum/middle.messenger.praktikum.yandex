import Block from '../../utils/Block'
import template from './sentMessage.hbs'
import './sentMessage.scss'

interface SentMessageProps {
  sent_message: string
}

export default class SentMessage extends Block {
  constructor(props: SentMessageProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
