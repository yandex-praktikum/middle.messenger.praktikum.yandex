import Block from '../../utils/Block'
import { template } from './input.templ'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface InputProps {
  name: string
  value?: string | number
  type: string
  placeholder?: string
  required?: boolean
  autofocus?: boolean
  classes?: string[]
  class?: string
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }

  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c) => styles[c])
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }

  public getName() {
    return (this.element as HTMLInputElement).name
  }

  public getValue() {
    return (this.element as HTMLInputElement).value
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
