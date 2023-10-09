import { Component } from "@/shared/model";
import styles from "./chatHeader.module.css";
import { ChatHeaderProps } from "./chatHeader.types";
import { connect } from "@/shared/model/store/connect";

class ChatHeader extends Component {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  protected render(): string {
    if (this.props.currentChatId) {
      console.log(this.props.currentChatId);
      return `
        <div class="${styles.chatHeader}">
          <div>
            <h3>Список пользователей</h3>
          </div>
          <div>
            {{{ InputField type="text" label="Логин пользователя" }}}
            {{{ Button label="Добавить пользователя" }}}
          </div>
          <div>
            {{{ Button label="Удалить чат" }}}
          </div>
        </div>
      `;
    }
    return "";
  }
}

const ChatHeaderWithStore = connect(({ currentChatId }) => ({
  currentChatId,
}))(ChatHeader);
export { ChatHeaderWithStore };
