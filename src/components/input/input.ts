import Block, {Props} from '../../core/Block'
import './input.css'

// language=hbs
const inputTemplate: string = `
    <div class="input">
        <label class="input__label" for="{{name}}">
            {{ label }}
            <input class="input__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" />
        </label>
    </div>
`

type InputProps = {
  name: string
  type: string
  label: string
  placeholder?: string
  className?: string
} & Props

export default class Input extends Block {
  _name: string

  constructor(props: InputProps) {
    super(props)
    this._name = props.name
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

  render() {
    return this.compile(inputTemplate, this.props)
  }
}
