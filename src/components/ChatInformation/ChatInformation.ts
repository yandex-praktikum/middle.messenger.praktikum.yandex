import { Block } from "../../core/index";
import template from "./ChatInformation.tmp.pug";

export default class ChatInformation extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
