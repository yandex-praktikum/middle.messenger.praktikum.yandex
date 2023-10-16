import { Block } from "../../core/index";
import template from "./Chats.tmp.pug";

export default class Chats extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
