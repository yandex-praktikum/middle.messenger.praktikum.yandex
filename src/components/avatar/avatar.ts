import Block from "../../core/Block";
import './avatar.css'

const avatarTemplate = `
    <div class="avatar">
        <img class="avatar__img" src="{{src}}" alt="{{alt}}">
    </div>
`

type AvatarProps = {
  src: string
  alt: string
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props)
  }

  render() {
    return this.compile(avatarTemplate, this.props)
  }
}
