import Block from '../../utils/Block'
import { template } from './form.templ'
import { Tag } from '../Tags/tags'
import { setStyles, warningStyles } from '../../utils/Helpers'
import { validateInput } from '../../utils/Helpers'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface FormProps {
  title?: string
  inputs: Block[]
  buttons: Block[]
  avatar?: Block
  link?: Block
  info?: Block
  onSubmit?: any
  valid?: boolean
  events?: {
    submit: (e: any) => void
  }
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ title: '', valid: false, ...props })
  }

  init() {
    this.children.title = new Tag({
      tag: 'h2',
      content: this.props.title,
    })

    // add toggleWarning to inputs
    const inputContainers = this.children.inputs as Block[]
    const inputs = inputContainers.map((container) => {
      const content = container.children.content as Block[]
      return content[1]
    })

    inputs.forEach((i: Block) => {
      i.setProps({
        toggleWarning: this.toggleWarning.bind(this),
        formValidator: this.validate.bind(this),
      })
    })

    // add submit function
    const button = this.children.buttons as Block[]
    button[0].setProps({
      events: {
        click: () => this.submit(),
      },
    })
  }

  validate() {
    const inputContainers = this.children.inputs as Block[]
    const inputs = inputContainers.map((container) => {
      const content = container.children.content as Block[]
      return content[1]
    })

    // this.children.inputs as Input[]
    // validate each input on regex
    const inputsData = inputs.map((i) => validateInput(i))
    // store the form data to submit if valid
    this.props.data = inputsData.reduce(
      (result, { name, value }) => ({ ...result, [name]: value }),
      {},
    )
    const invalidData = inputsData.filter((d) => !d.valid)
    if (invalidData.length > 0) {
      this.setProps({ valid: false })
      const warnings = invalidData.map((d) => `* ${d.warning}`).join('\n')
      alert(warnings)
    } else {
      this.setProps({ valid: true })
    }
  }

  submit() {
    this.validate() // validates and sets this.props.data values
    const data = this.props.data
    console.log(`Form ${this.props.title} is valid and submitted`)
    console.log(JSON.stringify(data, null, 2))
    this.props.onSubmit(data)
  }

  toggleWarning(valid: boolean, message: string) {
    const info = this.children.info as Block
    const warningElement = info.getContent() as HTMLElement
    if (warningElement) {
      if (valid) {
        setStyles(warningElement, warningStyles.pending)
        warningElement.getElementsByTagName('p')[0].textContent = ''
      } else {
        setStyles(warningElement, warningStyles.invalid)
        warningElement.getElementsByTagName('p')[0].textContent = message
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
