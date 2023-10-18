import { Block } from "../../core/index";
import template from "./Layout.tmp.pug";

export default class Layout extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
