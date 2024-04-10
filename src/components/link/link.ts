import Block, { Props } from '@/core/Block'
import './link.css'

// language=hbs
const LinkTemplate = `<a class="link {{ className }}" href="{{ to }}">{{ label }}</a> `

type LinkProps = {
  to: string
  label: string
  className?: string
} & Props

export default class Link extends Block {
  constructor(props: LinkProps) {
    super(props)
  }

  render() {
    return this.compile(LinkTemplate, this.props)
  }
}
