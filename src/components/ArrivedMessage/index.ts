import Block from '../../utils/Block'
import template from './arrivedMessage.hbs'
import './arrivedMessage.scss'

interface ArrivedMessageProps {
  arrived_message: string
}

export default class ArrivedMessage extends Block {
  constructor(props: ArrivedMessageProps) {
    super(props)
  }
  render() {
    return this.compile(template, this.props)
  }
}
