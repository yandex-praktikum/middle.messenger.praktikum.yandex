import { Component } from "@/shared/model";
import styles from "./chatWindow.module.css";
import { ChatWindowProps } from "./chatWindow.types";
import { connect } from "@/shared/model/store/connect";

class ChatWindow extends Component {
  constructor(props: ChatWindowProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
      <div class=${styles.chatWindow}>
        {{{ ChatHeader }}}
        {{{ MessagesList messages=messages }}}
        {{{ SendMessage }}}
      </div>
    `;
  }
}

const ChatWindowWithStore = connect(({ currentChatId, messages }) => ({
  currentChatId,
  messages,
}))(ChatWindow);
export { ChatWindowWithStore };
