import Block, { Props } from '@/core/Block'
import Button from '../button/button'
import Input from '../input/input'

// language=hbs
const FormTemplate: string = `
    <form class="{{ className }}">
        {{{ inputs }}}
        {{{ submitBtn }}}
    </form>
`

export type FormProps = {
  inputs: Input[]
  submitBtn: Button
  className?: string
} & Props

export default class Form extends Block {
  inputs: Input[]

  constructor(props: FormProps) {
    super(props)
    this.inputs = props.inputs
  }

  showInputError(inputName: string, error: string) {
    const input = this.inputs.filter((input) => input.name === inputName)[0]
    input.showError(error)
  }

  getValues(): Record<string, string> | boolean {
    const data: { [index: string]: string } = {}

    this.blockArrays.inputs.forEach((input) => {
      if (input instanceof Input) {
        const isValid = input.validate()
        if (isValid) {
          data[input.name] = input.getValue()
        }
      }
    })

    if (Object.keys(data).length) {
      console.log(data)
      return data
    } else {
      console.log('Форма содержит ошибки')
      return false
    }
  }

  setValues(inputsValues: { [inputName: string]: string }) {
    Object.entries(inputsValues).forEach(([key, value]) => {
      const targetInput = this.inputs.filter((input) => input.name === key)[0]
      if (targetInput) {
        targetInput.setValue(value)
      }
    })
  }

  render() {
    console.log('render form')
    return this.compile(FormTemplate, this.props)
  }
}
