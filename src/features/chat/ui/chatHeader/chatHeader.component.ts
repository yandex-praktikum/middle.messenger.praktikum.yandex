import { Component } from "@/shared/model";
import styles from "./chatHeader.module.css";

class ChatHeader extends Component {
  protected render(): string {
    return `
      <div class="${styles.chatHeader}">
        <div>
          {{{ UserImage isSmall="true" }}}
          Иван
        </div>
        <div>
          {{{ Button label="Настройки" }}}
        </div>
      </div>
    `;
  }
}

export { ChatHeader };
