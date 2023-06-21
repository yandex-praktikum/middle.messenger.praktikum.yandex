import Block from '../../utils/Block'
import { template } from './form.templ'
import { withRouter } from '../../hocs/withRouter'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface FormProps {
  title: string
  inputs: Block[]
  button: Block
  link: Block
  events?: {
    action: () => void
  }
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ ...props })
  }

  init() {
    console.log(this.children)
    // for (const [key, value] of Object.entries(this.children.content)) {
    //   console.log(`${key}: ${value}`)
    // }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
