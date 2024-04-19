import Block, { Props } from '@/core/Block'
import './avatar.css'

// language=hbs
const avatarTemplate = `
  <div class="avatar {{ className }}">
    <img class="avatar__img" src="{{src}}" alt="{{alt}}">
    {{#if canChange}}
      <div class="avatar__text">
        <span>{{{ changeContent }}}</span>
      </div>
    {{/if}}
  </div>
`

type AvatarProps = {
  src: string
  alt: string
  size?: string
  className?: string
  canChange?: boolean
  changeContent?: string
} & Props

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    if (!props.src) {
      props.src =
        'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
    }

    super(props)

    if (!this.props.canChange) {
      this.props.canChange = false
    }
    if (!this.props.changeContent) {
      this.props.changeContent = 'Поменять аватар'
    }

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
