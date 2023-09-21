import { Component } from "@/shared/model";
import { ChatCardProps } from "./chatCard.types";
import styles from "./chatCard.module.css";

class ChatCard extends Component {
  constructor(props: ChatCardProps) {
    super(props);
  }

  protected render() {
    return `
      <div class="${styles.chatCard}">
        <div class="${styles.userImageContainer}">
          {{{ UserImage isSmall="true" }}}
        </div>

        <div class="${styles.messageContainer}">
          <span class="${styles.title}">
            {{title}}
          </span>
          <div class="${styles.message}">
            {{message}}
          </div>
        </div>

        <div class="${styles.dateContainer}">
          <span class="${styles.date}">
            {{date}}
          </span>
          <div class="${styles.newMessages}">
             {{newMessages}}
          </div>
        </div>
      </div>
    `;
  }
}

export { ChatCard };
