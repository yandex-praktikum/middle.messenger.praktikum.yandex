import { Block } from "../../core/index";
import template from "./Conversation.tmp.pug";

export default class Conversation extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
