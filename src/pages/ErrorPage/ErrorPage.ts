import { Block } from "../../core/index";
import template from "./ErrorPage.tmp.pug";

export default class ErrorPage extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
