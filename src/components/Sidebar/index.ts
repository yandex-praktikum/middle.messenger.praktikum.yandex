import Block from '../../utils/Block'
import template from './sidebar.hbs'
import './sidebar.scss'

export default class Sidebar extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
