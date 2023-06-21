import Block from '../../utils/Block'
import { template } from './buttonAwesome.templ'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
console.log('tyles', styles)
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
    return this.compile(template, { ...this.props, styles })
  }
}
