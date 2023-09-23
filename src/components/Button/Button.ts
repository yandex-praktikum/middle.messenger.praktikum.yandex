import { Block } from "../../core/index";
import template from "./Button.tmp.pug";

export default class Button extends Block {
  constructor(props) {
    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
