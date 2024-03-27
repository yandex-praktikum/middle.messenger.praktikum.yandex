import Block, { Props } from '../../core/Block'
import './input.css'

// language=hbs
const inputTemplate: string = `
  <label class="label" for="{{name}}">
    <span>{{ label }}</span>
    {{{ input }}}
    <span class="error">{{ errorText }}</span>
  </label>
`

type InputValidation = {
  required?: boolean
  regExp?: RegExp
  errorText?: string
}

type InputProps = {
  name: string
  type: string
  label: string
  placeholder?: string
  className?: string
  validation?: InputValidation
} & Props

export default class Input extends Block {
  _name: string
  _inputElement: InputField

  constructor(props: InputProps) {
    const input = new InputField({ ...props })
    super({
      ...props,
      input: input,
    })
    input.props._parentBlock = this
    this._name = props.name
    this._inputElement = input
  }

  get name() {
    return this._name
  }

  getValue() {
    return this._inputElement.getValue()
  }

  validate() {
    return this._inputElement.validate()
  }

  render() {
    return this.compile(inputTemplate, this.props)
  }
}

// language=hbs
const inputFieldTemplate: string = `
  <input class="input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" />
`

class InputField extends Block {
  _validation?: InputValidation

  constructor(props: Partial<InputProps>) {
    super({
      ...props,
      events: {
        blur: () => {
          this.validate()
          this.toggleErrorClass()
        },
      },
    })
    if (props.validation) {
      this._validation = props.validation
    }
  }

  getValue() {
    const element = this.element as HTMLInputElement
    return element.value
  }

  toggleErrorClass() {
    this.element.classList.toggle('input_error', !this.validate())
  }

  validate() {
    const parent = this.props._parentBlock as Input
    const value = this.getValue()

    if (!this._validation) {
      return true
    }

    if (this._validation.required && !value.length) {
      parent.props.errorText = 'Необходимо заполнить это поле'
      return false
    } else if (
      this._validation.regExp &&
      !this._validation.regExp.test(value)
    ) {
      parent.props.errorText = this._validation.errorText
      return false
    }

    parent.props.errorText = ''
    return true
  }

  render() {
    return this.compile(inputFieldTemplate, this.props)
  }
}
