import Block from '../../utils/Block'
import template from './ref.hbs'
import './ref.scss'

interface RefProps {
  href: string
  color?: string
  border_color?: string
  ref_name: string
  onClick?: () => void
  event?: () => void
}

export class Ref extends Block {
  constructor(props: RefProps) {
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
