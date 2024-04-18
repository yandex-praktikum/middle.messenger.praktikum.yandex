import Block, { Props } from '@/core/Block'
import './link.css'
import router from '@/router.ts'

// language=hbs
const LinkTemplate = `<a class="link {{ className }}">{{ label }}</a> `

type LinkProps = {
  to: string
  label: string
  className?: string
} & Props

export default class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => {
          router.go(props.to)
        },
      },
    })
  }

  render() {
    return this.compile(LinkTemplate, this.props)
  }
}
