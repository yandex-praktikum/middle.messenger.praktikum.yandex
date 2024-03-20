import Block, {Props} from "../../core/Block";
import Input from "../input/input";
import Button from "../button/button";

// language=hbs
const FormTemplate = `<form class="{{ className }}">
  {{{ submitBtn }}}
</form>`

export type FormProps = {
  inputs: Input[]
  submitBtn: Button
  className?: string
} & Props

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    return this.compile(FormTemplate, this.props);
  }
}
