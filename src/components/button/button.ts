import Handlebars from 'handlebars'
import Block, { Props } from '../../core/Block'

export default class Button extends Block {
  constructor(props: Props | undefined) {
    super('button', props)
  }

  render() {
    const { label } = this.props
    const source = `<button class="button {{class}}">{{label}}</button>`
    const template = Handlebars.compile(source)
    return template(label)
  }
}
