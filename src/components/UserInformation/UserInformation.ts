import { Block } from "../../core/index";
import template from "./UserInformation.tmp.pug";

import "./UserInformation.scss";

export default class UserInformation extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
