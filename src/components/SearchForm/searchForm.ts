import Block from '../../utils/Block'
import { template } from './SearchForm.templ'
import { Tag } from '../Tags/tags'
import { ButtonAwesome } from '../Buttons/buttons'
import { Input } from '../Input/input'
import { setStyles } from '../../utils/Helpers'
import { validateInput } from '../../utils/Helpers'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
const warningStyles = {
  pending: {
    display: 'none',
  },
  valid: {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    border: '1px solid green',
  },
  invalid: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    border: '1px solid red',
  },
}

export class SearchForm extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.button = new ButtonAwesome({
      icon: 'fas fa-search',
      title: 'Search...',
      events: {
        click: this.submit.bind(this),
      },
    })
    this.children.input = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Search...',
      classes: ['input-search'],
    })
  }

  validate() {}

  submit() {
    this.validate()
    const input = this.children.input as Input
    const data = input.getValue()
    console.log(`Search submitted`)
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
    // AuthController.signin(data as SignupData)
    // redirect({ url: '/messenger' })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
