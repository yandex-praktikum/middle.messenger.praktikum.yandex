import { Block } from "../../core/index";
import template from "./Spinner.tmp.pug";

import "./Spinner.scss";

export default class Spinner extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
