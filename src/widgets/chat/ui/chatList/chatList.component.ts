import { Component } from "@/shared/model";
import { ChatListProps } from "./chatList.types";
import styles from "./chatList.module.css";

class ChatList extends Component {
  constructor(props: ChatListProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
      <div class="${styles.chatList}">
        <div class="${styles.linkToProfileContainer}">
          <a class="${styles.linkToProfile}" href="/profile">Профиль ></a>
        </div>
        {{{ SearchChat }}}
        <div>
          {{#each chats}}
            {{{ ChatCard title=title message=last_message date=date newMessages=unread_count id=id }}}
          {{/each}}
        </div>
      </div>
    `;
  }
}

export { ChatList };
