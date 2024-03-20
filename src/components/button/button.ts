import Block, {Props} from '../../core/Block'
import './button.css'

const buttonTemplate: string = `<button class="button {{class}}">{{ label }}</button>`

type ButtonProps = {
  label: string
  className?: string
} & Props

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props)
  }

  render() {
    return this.compile(buttonTemplate, this.props)
  }
}
