import Block, { Props } from '../../core/Block'
import './input.css'

// language=hbs
const inputTemplate: string = `
  <div class="input">
    <label class="input__label" for="{{name}}">
      {{ label }}
      <input class="input__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}"/>
    </label>
    <span class="input__warning">{{{ warning }}}</span>
  </div>
`

type InputValidation = {
  required?: boolean
  regExp?: RegExp
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
  _validation?: InputValidation

  constructor(props: InputProps) {
    super(props)
    this._name = props.name
    if (props.validation) {
      this._validation = props.validation
    }
  }

  get name() {
    return this._name
  }

  getValue() {
    const element = this.element.querySelector('.input__input')

    if (element instanceof HTMLInputElement) {
      return element.value
    } else {
      throw new Error('Input: нет элемента')
    }
  }

  validate() {
    const value = this.getValue()
    if (this._validation && this._validation.required) {
      console.log(value.length)
    }
  }

  render() {
    console.log(this.props)
    const element = this.compile(inputTemplate, this.props)
    const inputElement = element.querySelector('.input__input')
    if (inputElement) {
      inputElement.addEventListener('blur', () => {
        this.validate()
      })
    }
    return element
  }
}
