import Block from '../../utils/Block'
import { template } from './tools.templ'
import { withRouter } from '../../hocs/withRouter'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface ToolsProps {
  buttons: Block[]
}

export class Tools extends Block<ToolsProps> {
  constructor(props: ToolsProps) {
    super({ ...props })
  }

  init() {
    // console.log(this.children)
    // for (const [key, value] of Object.entries(this.children.content)) {
    //   console.log(`${key}: ${value}`)
    // }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
