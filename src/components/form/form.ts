import Block, {Props} from "../../core/Block";
import Input from "../input/input";
import Button from "../button/button";

// language=hbs
const FormTemplate = `<form class="{{ className }}">
  {{{ inputs }}}
  {{{ submitBtn }}}
</form>`

export type FormProps = {
  inputs: Input[]
  submitBtn: Button
  className?: string
} & Props

export default class Form extends Block {
  constructor(props: FormProps) {
    super(props);
    this.props.events = {
      submit: (e) => {
        e.preventDefault()
        this.getValues()
      }
    }
  }

  getValues() {
    const data: { [index: string]: string } = {}
    this.blockArrays.inputs.forEach(input => {
      if (input instanceof Input) {
        data[input.name] = input.getValue()
      }
    })
    console.log(data)
  }

  render() {
    return this.compile(FormTemplate, this.props);
  }
}
