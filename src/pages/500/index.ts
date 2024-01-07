import Block from '../../utils/Block'
import template from './error.hbs'
import './error.scss'

export default class Page500 extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
