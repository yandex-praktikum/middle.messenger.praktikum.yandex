import Block from '../../utils/Block'
import { template } from './form.templ'
import { Tag } from '../Tags/tags'
import { Input } from '../Input/input'
import { setStyles } from '../../utils/Helpers'
import { validateForm } from '../../utils/Helpers'
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

interface FormProps {
  title?: string
  inputs: Block[]
  button: Block
  avatar?: Block
  link?: Block
  info?: Block
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({ title: '', valid: false, ...props })
  }

  init() {
    this.children.title = new Tag({
      tag: 'h2',
      content: this.props.title,
    })

    // add toggleWarning to inputs
    this.children.inputs.forEach((i) => {
      i.setProps({
        toggleWarning: this.toggleWarning.bind(this),
        formValidator: this.validate.bind(this),
      })
    })

    this.children.button.setProps({
      events: {
        click: () => this.submit(),
      },
    })

    this.validate()
  }

  validate() {
    const inputs = this.children.inputs
    const values = inputs.map((i: Input) => [i.getName(), i.getValue()])
    this.setProps({ data: Object.fromEntries(values) })
    const valid = validateForm(this.props.data)
    this.setProps({ valid })
    if (this.props.valid) this.children.button.setProps({ disabled: false })
  }

  submit() {
    this.validate()
    const data = this.props.data
    console.log(`Form ${this.props.title} is valid and submitted`)
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
    // AuthController.signin(data as SignupData)
    // redirect({ url: '/messenger' })
  }

  toggleWarning(valid: boolean, message: string) {
    const warningElement = this.children.info.getContent() as HTMLElement
    if (warningElement) {
      if (valid) {
        setStyles(warningElement, warningStyles.pending)
        warningElement.getElementsByTagName('p')[0].textContent = ''
        this.setProps({ valid: true })
      } else {
        setStyles(warningElement, warningStyles.invalid)
        warningElement.getElementsByTagName('p')[0].textContent = message
        this.setProps({ valid: false })
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
