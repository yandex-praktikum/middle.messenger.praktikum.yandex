import { Component } from "@/shared/model";
import styles from "./chatWindow.module.css";
import { ChatWindowProps } from "./chatWindow.types";
import { connect } from "@/shared/model/store/connect";

class ChatWindow extends Component {
  constructor(props: ChatWindowProps) {
    super({
      ...props,
      onClick: () => {
        const { chatSocket } = window.store.getState();
        chatSocket?.send({
          type: "message",
          content: "test",
        });
      },
    });
  }

  protected render() {
    return `
      <div class=${styles.chatWindow}>
        {{{ ChatHeader }}}
        {{{ Button onClick=onClick }}}
        {{{ SendMessage }}}
      </div>
    `;
  }
}

const ChatWindowWithStore = connect(({ currentChatId }) => ({ currentChatId }))(
  ChatWindow,
);
export { ChatWindowWithStore };
