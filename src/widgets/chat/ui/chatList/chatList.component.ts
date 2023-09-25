import { Component } from "@/shared/model";
import { ChatListProps } from "./chatList.types";
import styles from "./chatList.module.css";

class ChatList extends Component {
  constructor(props: ChatListProps) {
    super({
      ...props,
      chats: [
        {
          title: "Иван",
          message:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          date: "10:11",
          newMessages: 3,
        },
      ],
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
            {{{ ChatCard title=title message=message date=date newMessages=newMessages }}}
          {{/each}}
        </div>
      </div>
    `;
  }
}

export { ChatList };
