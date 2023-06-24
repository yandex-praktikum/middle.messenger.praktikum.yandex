import Block from '../../utils/Block'
import { template, templateAwesome } from './buttons.templ'
import { redirect } from '../../commonActions/actions'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface ButtonProps {
  type?: string
  label: string
  events: {
    click: () => void
  }
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

interface ButtonAwesomeProps {
  icon: string
  title: string
  classes?: string[]
  class?: any
  events?: {
    click?: () => void
  }
}

export class ButtonAwesome extends Block<ButtonAwesomeProps> {
  constructor(props: ButtonAwesomeProps) {
    super({ ...props })
  }

  init() {
    if (this.props.classes)
      this.props.class = this.props.classes.map((c) => {
        return styles[c]
      })
  }

  render() {
    return this.compile(templateAwesome, { ...this.props, styles })
  }
}
