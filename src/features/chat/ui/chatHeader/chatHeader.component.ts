import { Component } from "@/shared/model";
import styles from "./chatHeader.module.css";
import { ChatHeaderProps } from "./chatHeader.types";
import { connect } from "@/shared/model/store/connect";
import { User } from "@/shared/api/user";
import { validateIsNotEmpty } from "@/shared/lib";

class ChatHeader extends Component {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      validateIsNotEmpty,
      handleAddUserClick: () => {
        const usernameToAdd = this.refs.username.value();
        console.log(this.refs.username.value());
      },
    });
  }

  protected render() {
    const { currentChatId, currentChatUsers } = this.props;
    if (currentChatId && currentChatUsers) {
      const users = currentChatUsers.map((user: User) => `<li>${user.login}`);
      return `
        <div class="${styles.chatHeader}">
          <div>
            <h3>Список пользователей</h3>
            <ul>
              ${users}
            </ul>
          </div>
          <div>
            {{{ InputField type="text" label="Логин пользователя" ref="username" validate=validateIsNotEmpty }}}
            {{{ Button label="Добавить пользователя" onClick=handleAddUserClick }}}
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

const ChatHeaderWithStore = connect(({ currentChatId, currentChatUsers }) => ({
  currentChatId,
  currentChatUsers,
}))(ChatHeader);
export { ChatHeaderWithStore };
