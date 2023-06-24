import Block from '../../utils/Block'
import { template, templateScroller } from './tags.templ'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface TagProps {
  tag: string
  name?: string
  content?: string
  classes?: string[]
  class?: any
  events?: {
    click: () => void
  }
}

export class Tag extends Block<TagProps> {
  constructor(props: TagProps) {
    super({ ...props })
  }
  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c) => styles[c])
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
