import { Block } from "../../core/index";
import templateInner from "./MessageInner.tmp copy.pug";
import templateOuter from "./MessageOuter.tmp.pug";

export default class Message extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    const { login, active_user_login } = this.props;

    return this.compile(login === active_user_login ? templateInner : templateOuter, this.props);
  }
}
