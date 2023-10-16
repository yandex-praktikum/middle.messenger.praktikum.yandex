import { Block } from "../../core/index";
import template from "./Avatar.tmp.pug";

import "./Avatar.scss";

export default class Avatar extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
