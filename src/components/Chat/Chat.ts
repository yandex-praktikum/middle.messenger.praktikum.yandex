import { Block, Store } from "../../core/index";
import template from "./Chat.tmp.pug";

import "./Chat.scss";

export default class Chat extends Block {
  constructor(props?: object) {
    super('div', {
      ...props,
      events: new Map([[
        'click', () => {
          Store.set('selectedChat', this.props.id)
        }]]),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
