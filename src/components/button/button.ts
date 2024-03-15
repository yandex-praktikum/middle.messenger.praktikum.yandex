import Block, { Props } from '../../core/Block'

const buttonTemplate: string = `<button class="button {{class}}">{{{ label }}}</button>`

type ButtonProps = {
  label: string
  className?: string
} & Props

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props)
  }

  render() {
    return this.compile(buttonTemplate, this.props)
  }
}
