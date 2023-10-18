import { Block } from "../../core/index";
import templateInner from "./MessageInner.tmp copy.pug";
import templateOuter from "./MessageOuter.tmp.pug";

export default class Message extends Block {
  constructor(props?: object) {
    super('div', props);
  }

  render() {
    const { user_id, active_user_id } = this.props;

    return this.compile(user_id === active_user_id ? templateInner : templateOuter, this.props);
  }
}
