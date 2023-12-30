import Block from '../../utils/Block'
import template from './button.hbs'
import './button.scss'

interface ButtonProps {
  label: string
  type?: 'submit' | 'button'
  onClick?: () => void
  events?: {
    click: () => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
