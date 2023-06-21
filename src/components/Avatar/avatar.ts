import Block from '../../utils/Block'
import { template } from './avatar.templ'

interface AvatarProps {
  title: string
  src: string
  class: string
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
