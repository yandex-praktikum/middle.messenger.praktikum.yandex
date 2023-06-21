import Block from '../../utils/Block'
import { template } from './input.templ'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface InputProps {
  name: string
  type: string
  placeholder: string
  required?: boolean
  autofocus?: boolean
  class?: string
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
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
