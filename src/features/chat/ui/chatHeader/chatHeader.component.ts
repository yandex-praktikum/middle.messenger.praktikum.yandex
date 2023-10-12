import { Component } from "@/shared/model";
import styles from "./chatHeader.module.css";
import { ChatHeaderProps } from "./chatHeader.types";
import { connect } from "@/shared/model/store/connect";
import { User } from "@/shared/api/user";
import { validateIsNotEmpty } from "@/shared/lib";
import { ChatAPI } from "@/shared/api";

class ChatHeader extends Component {
  constructor(props: ChatHeaderProps) {
    const chatAPI = new ChatAPI();
    super({
      ...props,
      validateIsNotEmpty,
      handleAddUserClick: () => {
        const userId = this.refs.username.value();
        chatAPI.addUser(props.currentChatId as string, userId);
      },
      handleDeleteUserClick: () => {
        const userId = this.refs.username.value();
        chatAPI.deleteUser(props.currentChatId as string, userId);
      },
      handleDeleteChatClick: () => {
        chatAPI.deleteChat(props.currentChatId as string);
      },
    });
  }

  protected render() {
    const { currentChatId, currentChatUsers } = this.props;
    if (currentChatId && currentChatUsers) {
      const users = currentChatUsers.map(
        (user: User) => `<li>${user.login}</li>`,
      );
      return `
        <div class="${styles.chatHeader}">
          <div>
            <h3>Список пользователей</h3>
            <ul>
              ${users}
            </ul>
          </div>
          <div>
            {{{ InputField type="text" label="id пользователя" ref="username" validate=validateIsNotEmpty }}}
            {{{ Button label="Добавить пользователя" onClick=handleAddUserClick }}}
            {{{ Button label="Удалить пользователя" onClick=handleDeleteUserClick }}}
          </div>
          <div>
            {{{ Button label="Удалить чат" onClick=handleDeleteChatClick }}}
          </div>
        </div>
      `;
    }
    return "<span></span>";
  }
}

const ChatHeaderWithStore = connect(({ currentChatId, currentChatUsers }) => ({
  currentChatId,
  currentChatUsers,
}))(ChatHeader);
export { ChatHeaderWithStore };
