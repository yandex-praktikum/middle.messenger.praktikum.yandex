import Block from '../../utils/Block.js'
// import AuthController from '../../controllers/AuthController'
import { template, detailTemplate } from './profile.templ.js'
import data from '../../../public/data.js'
import { buttonAwesome } from '../../components/Buttons/buttonAwesome'
import { Avatar } from '../../components/Avatar/avatar.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

const { profile } = data
console.log(data)
interface DetailsProps {
  value: string | number
  label: string
}

export class Details extends Block<DetailsProps> {
  constructor(props: DetailsProps) {
    super({ ...props })
  }

  render() {
    return this.compile(detailTemplate, { ...this.props, styles })
  }
}

export class ProfilePage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.avatar = new Avatar({
      title: 'Avatar',
      src: profile.avatar,
    })

    const userDetails = [
      { label: 'Name', value: profile.first_name },
      { label: 'Last Name', value: profile.second_name },
      { label: 'Email Address', value: profile.login },
      { label: 'Phone Number', value: profile.phone },
      { label: 'Age', value: profile.age },
      { label: 'City', value: profile.city },
    ]
    this.children.details = userDetails.map((d) => new Details(d))

    const buttons = [
      {
        icon: 'fa-solid fa-angle-left',
        title: 'Back',
      },
      {
        icon: 'fa-solid fa-bars',
        title: 'Settings',
      },
    ]

    this.children.buttons = buttons.map((d) => new buttonAwesome(d))
  }
  render() {
    console.log('render reg')
    console.log(this.props)
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props, styles })
  }
}
