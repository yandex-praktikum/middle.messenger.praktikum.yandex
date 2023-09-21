import { Component } from "@/shared/model";
import styles from "./chatPage.module.css";

class ChatPage extends Component {
  protected render() {
    return `
      <div class="${styles.chatPage}">
        {{{ ChatList }}}
        {{{ ChatWindow}}}
      </div>
    `;
  }
}

export { ChatPage };
