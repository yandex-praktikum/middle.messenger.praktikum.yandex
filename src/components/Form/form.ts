import Block from '../../utils/Block'
import { template } from './form.templ'
import { Tag } from '../Tags/tags'
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

interface FormProps {
  title?: string
  inputs: Block[]
  button: Block
  avatar?: Block
  link?: Block
  info?: Block
  onSubmit: any
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
    const inputs = this.children.inputs as Block[]
    inputs.forEach((i: Block) => {
      i.setProps({
        toggleWarning: this.toggleWarning.bind(this),
        formValidator: this.validate.bind(this),
      })
    })
    const button = this.children.button as Block
    button.setProps({
      events: {
        click: () => this.submit(),
      },
    })
  }

  validate() {
    const inputs = this.children.inputs as Input[]
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
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
    const onSubmit = this.props.onSubmit
    console.log(onSubmit)
    onSubmit(data)
    // AuthController.signin(data as SignupData)
    // redirect({ url: '/messenger' })
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
