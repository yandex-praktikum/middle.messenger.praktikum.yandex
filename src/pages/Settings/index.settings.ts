import Block from '../../utils/Block.js'
// import AuthController from '../../controllers/AuthController'
import { template } from './settings.templ.js'
// import data from '../../../public/data.js'
// import { redirect} from '../../components/Buttons/actions.js'
// import { ButtonAwesome } from '../../components/Buttons/buttons.js'
// import { Avatar } from '../../components/Avatar/avatar.js'
// import { Container } from '../../components/Containers/containers.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

export class SettingsPage extends Block {
  constructor() {
    super({})
  }

  init() {
    //
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
