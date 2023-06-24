import Block from '../../utils/Block'
import { template } from './form.templ'
import { Tag } from '../Tags/tags'
import { Container } from '../Containers/containers'
import { withRouter } from '../../hocs/withRouter'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface FormProps {
  title?: string
  avatar?: Block
  inputs: Block[]
  button: Block
  link?: Block
  events?: {
    action: () => void
  }
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ title: '', ...props })
  }

  init() {
    this.children.title = new Tag({
      tag: 'h2',
      content: this.props.title,
    })
    // console.log(this.children.inputs)
    // for (const [key, value] of Object.entries(this.children.content)) {
    //   console.log(`${key}: ${value}`)
    // }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
