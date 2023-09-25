import { Component } from "@/shared/model";
import styles from "./chatWindow.module.css";
import { ChatWindowProps } from "./chatWindow.types";

class ChatWindow extends Component {
  constructor(props: ChatWindowProps) {
    super(props);
  }

  protected render() {
    return `
      <div class=${styles.chatWindow}>
      {{{ ChatHeader }}}
      {{{ SendMessage }}}
      </div>
    `;
  }
}

export { ChatWindow };
