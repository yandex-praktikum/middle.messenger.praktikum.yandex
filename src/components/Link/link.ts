import Block from '../../utils/Block'
import { PropsWithRouter, withRouter } from '../../utils/withRouter.js'
import { template } from './link.templ.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
interface LinkProps extends PropsWithRouter {
  to: string
  label: string
  events?: {
    click: () => void
  }
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    })
  }

  navigate() {
    this.props.router.go(this.props.to)
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

export const Link = withRouter(BaseLink)
