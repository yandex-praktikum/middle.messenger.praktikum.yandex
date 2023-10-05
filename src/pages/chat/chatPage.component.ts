import { Component } from "@/shared/model";
import styles from "./chatPage.module.css";
import { ChatPageProps } from "./chatPage.types";
import { initChats } from "@/app/init";
import { connect } from "@/shared/model/store/connect";

class ChatPage extends Component {
  constructor(props: ChatPageProps) {
    super(props);
    initChats();
  }

  protected render() {
    return `
      <div class="${styles.chatPage}">
        {{{ ChatList chats=chats }}}
        {{{ ChatWindow }}}
      </div>
    `;
  }
}

const ChatPageWithStore = connect(({ chats }) => ({ chats }))(ChatPage);
export { ChatPageWithStore };
