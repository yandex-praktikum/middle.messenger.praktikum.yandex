import { Block } from "../../core/index";
import template from "./Avatar.tmp.pug";

import "./Avatar.scss";

export default class Avatar extends Block {
  constructor(props?: object) {
    super('div', { ...props, baseURL: import.meta.env.VITE_BASE_URL });
  }

  render() {
    return this.compile(template, this.props);
  }
}
