import Block from '../../utils/Block'
import template from './dialogItem.hbs'
import './dialogItem.scss'

export interface DialogItemProps {
  src_avatar: string
  name: string
  last_message: string
  message_time: string
  message_count?: number
}

export default class DialogItem extends Block {
  constructor(props: DialogItemProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
