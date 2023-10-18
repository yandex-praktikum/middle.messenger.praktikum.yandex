import { Block } from "../../core/index";
import template from "./ChatArea.tmp.pug";

import "./ChatArea.scss";

export default class ChatArea extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
