import Block from '../../utils/Block'
import { template } from './avatar.templ'
import { isEqual } from '../../utils/Helpers'
import { withStore } from '../../utils/Store'
import * as stylesDefs from './styles.module.scss'
import { User } from '../../api/AuthAPI'
const styles = stylesDefs.default

interface AvatarProps {
  title: string
  src: string | null
  classes?: string[]
  class?: string[]
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props })
  }

  init() {
    const src = this.props.src
      ? `https://ya-praktikum.tech/api/v2/resources${this.props.src}`
      : './public/images/cactus.png'

    this.props.src = src
    if (this.props.classes) this.props.class = this.props.classes.map((c) => styles[c])
  }

  // protected componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
  //   if (!isEqual(oldProps, newProps)) {
  //     const src = newProps.src
  //       ? `https://ya-praktikum.tech/api/v2/resources${newProps.src}`
  //       : './public/images/cactus.png'

  //     this.props.src = src
  //     return true
  //   }
  //   return false
  // }
  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

// const withChats = withStore((state) => {
//   return { chats: state.chats || [] }
// })

// export const Avatar = withChats(AvatarBase)
