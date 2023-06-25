import Block from '../../utils/Block.js'
import { template } from './settings.templ.js'
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
