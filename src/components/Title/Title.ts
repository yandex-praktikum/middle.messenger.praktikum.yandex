import { Block } from "../../core/index";
import template from "./Title.tmp.pug";

export default class Title extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
