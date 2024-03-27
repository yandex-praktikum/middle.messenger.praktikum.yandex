import Block from '../../core/Block'
import './avatar.css'

// language=hbs
const avatarTemplate = `
    <div class="avatar {{ className }}">
        <img class="avatar__img" src="{{ src }}" alt="{{alt}}">
    </div>
`

type AvatarProps = {
  src: string
  alt: string
  size?: string
  className?: string
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props)
    const element = this.element as HTMLElement
    if (props.size) {
      element.style.width = props.size
      element.style.height = props.size
    } else {
      element.style.width = '130px'
      element.style.height = '130px'
    }
  }

  render() {
    return this.compile(avatarTemplate, this.props)
  }
}
