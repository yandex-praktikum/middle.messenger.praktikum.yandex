import Block from '../../utils/Block'
import template from './input.hbs'
import './input.scss'

interface InputProps {
  label: string
  value?: string
  type: string
  placeholder: string
  name: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props })
  }
  render() {
    return this.compile(template, this.props)
  }
}
