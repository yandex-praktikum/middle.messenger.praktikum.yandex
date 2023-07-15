import Block from '../../utils/Block'
import { template } from './avatar.templ'
import { isEqual, imageExists } from '../../utils/Helpers'
import { withStore } from '../../utils/Store'
import * as stylesDefs from './styles.module.scss'
import { User } from '../../api/AuthAPI'
const styles = stylesDefs.default

interface AvatarProps {
  title: string
  src: string
  classes?: string[]
  class?: string[]
  user: User
}

export class AvatarBase extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props })
  }

  init() {
    this.props.src = this.props.user.avatar ? this.props.user.avatar : './public/images/cactus.png'
    if (this.props.classes) this.props.class = this.props.classes.map((c) => styles[c])
  }
  protected componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.props.src = imageExists(this.props.user.avatar)
        ? this.props.user.avatar
        : './public/images/cactus.png'
      return true
    }
    return false
  }
  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

const withChats = withStore((state) => {
  return { user: state.user || {} }
})

export const Avatar = withChats(AvatarBase)
