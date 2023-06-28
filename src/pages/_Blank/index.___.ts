import Block from '../../utils/Block'
import { template } from './___.templ'

interface ___Props {}

export class ___Page extends Block {
  constructor(props: ___Props) {
    super({})
  }

  init() {}

  render() {
    return this.compile(template, { ...this.props })
  }
}
