import Block from '../../utils/Block'
import { template } from './avatar.templ'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface AvatarProps {
  title: string
  src: string
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
