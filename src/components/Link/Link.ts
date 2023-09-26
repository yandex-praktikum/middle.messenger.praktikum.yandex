import { Block } from "../../core/index";
import template from "./Link.tmp.pug";

export default class Link extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
