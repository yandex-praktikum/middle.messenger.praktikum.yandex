import Block, { Props } from '@/core/Block'
import './avatar.css'

// language=hbs
const avatarTemplate = `
  <div class="avatar {{ className }}">
    <img class="avatar__img" src="{{src}}" alt="{{alt}}">
    <div class="avatar__text">
      <span>Сменить аватар</span>
    </div>
  </div>
`

type AvatarProps = {
  src: string
  alt: string
  size?: string
  className?: string
} & Props

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props)
    const element = this.element as HTMLElement

    if (props.src === '') {
      const img = element.querySelector('img')
      if (img) {
        img.src =
          'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
      }
    }

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
