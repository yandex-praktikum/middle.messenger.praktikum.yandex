import { Block } from "../../core/index";
import template from "./Button.tmp.pug";

import "./Button.scss";

export default class Button extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
