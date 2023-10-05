import { Component } from "@/shared/model";
import styles from "./messagesList.module.css";
import { MessagesListProps } from "./messagesList.types";

class MessagesList extends Component {
  constructor(props: MessagesListProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
      <div class="${styles.messagesList}">
        {{#each chats}}
          {{{ ChatCard title=title message=last_message date=date newMessages=unread_count id=id }}}
        {{/each}}
      </div>
    `;
  }
}

export { MessagesList };
