import { Component } from "@/shared/model";
import styles from "./chatPage.module.css";
import { ChatPageProps } from "./chatPage.types";

class ChatPage extends Component {
  constructor(props: ChatPageProps) {
    super(props);
  }

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
