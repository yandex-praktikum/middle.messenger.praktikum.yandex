import Block from '../../core/Block'
import './input.css'

const inputTemplate: string = `
    <div class="input">
        <label class="input__label" for="{{name}}">
            {{label}}
            <input class="input__input" id="{{name}}" name="{{name}}" type="{{type}}" value="{{initialValue}}" placeholder="{{placeholder}}" />
        </label>
    </div>
`

type InputProps = {
  name: string
  type: string
  label: string
  initialValue?: string
  placeholder?: string
  className?: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(inputTemplate, this.props)
  }
}
