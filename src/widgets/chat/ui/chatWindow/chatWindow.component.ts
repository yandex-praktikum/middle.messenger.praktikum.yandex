import { Component } from "@/shared/model";
import styles from "./chatWindow.module.css";

class ChatWindow extends Component {
  protected render() {
    return `
<div class=${styles.chatWindow}>
{{{ ChatHeader }}}
</div>
`;
  }
}

export { ChatWindow };
