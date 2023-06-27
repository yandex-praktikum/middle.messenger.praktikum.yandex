import Block from '../../utils/Block'
import { template } from './textarea.templ'
import * as stylesDefs from './styles.module.scss'
import { setStyles, validateInput } from '../../utils/Helpers'
const styles = stylesDefs.default
const inputStyles = {
  pending: {
    border: '1px solid gray',
  },
  valid: {
    border: '1px solid green',
  },
  invalid: {
    border: '1px solid red',
  },
}

export interface InputProps {
  name: string
  cols?: number
  rows?: number
  spellcheck?: boolean | 'default'
  wrap?: 'soft' | 'hard' | 'off'
  placeholder?: string
}

export class TextArea extends Block {
  constructor(props: InputProps) {
    super({
      spellcheck: true,
      wrap: 'soft',
      placeholder: 'Write a message...',
      cols: 4,
      rows: 5,
      ...props,
    })
  }

  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c: string) => styles[c])
    // this.props.events.blur = () => this.validate()
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
