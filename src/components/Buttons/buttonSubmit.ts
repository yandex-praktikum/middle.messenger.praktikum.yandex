import Block from '../../utils/Block'
import { template } from './buttonSubmit.templ'
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
