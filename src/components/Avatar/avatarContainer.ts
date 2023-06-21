import Block from '../../utils/Block'
import { template } from './avatarContainer.templ'

// ({avatar, display_name, selected, n})

interface AvatarContainerProps {
  avatar: string
  display_name: string
  selected: boolean
  newCount?: number
  message?: string
  events?: {
    click: () => void
  }
}

export class AvatarContainer extends Block<AvatarContainerProps> {
  constructor(props: AvatarContainerProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
