import { Component } from "@/shared/model";
import { ChatListProps } from "./chatList.types";
import styles from "./chatList.module.css";
import { ChatAPI } from "@/shared/api";

class ChatList extends Component {
  constructor(props: ChatListProps) {
    super({
      ...props,
      handleAddChat: async () => {
        try {
          const chatAPI = new ChatAPI();
          const title = this.refs.chatTitle.value();
          await chatAPI.create(title);
          const chats = await chatAPI.getAll();
          window.store.set({ chats });
        } catch (error) {
          console.error(error);
        }
      },
    });
  }

  protected render() {
    return `
      <div class="${styles.chatList}">
        {{{ Link to="/profile" label="Профиль" }}}
        {{{ InputField type="text" ref="chatTitle" name="chatTitle" value="" label="Название чата" }}}
        {{{ Button label="Добавить чат" onClick=handleAddChat }}}
        <div>
          {{#each chats}}
            {{{ ChatCard title=title message=last_message date=date newMessages=unread_count id=id userImage=avatar }}}
          {{/each}}
        </div>
      </div>
    `;
  }
}

export { ChatList };
