import Block from '../../utils/Block'
import { template } from './buttonAwesome.templ'

interface ButtonProps {
  icon: string
  title: string
  events?: {
    click: () => void
  }
}

export class buttonAwesome extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
