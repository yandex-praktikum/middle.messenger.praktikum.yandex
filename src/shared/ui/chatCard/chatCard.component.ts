import { Component } from "@/shared/model";
import { ChatCardProps } from "./chatCard.types";
import styles from "./chatCard.module.css";
import { ChatAPI } from "@/shared/api";

class ChatCard extends Component {
  constructor(props: ChatCardProps) {
    super({
      ...props,
      events: {
        click: () => {
          const { id } = props;
          window.store.set({ currentChatId: id });
          const chatAPI = new ChatAPI();
          chatAPI.initChat(id as string);
        },
      },
    });
  }

  protected render() {
    let avatarSrc = "";
    if (this.props?.userImage) {
      avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${this.props.userImage}"`;
    }
    return `
      <div class="${styles.chatCard}">
        <div class="${styles.userImageContainer}">
          {{{ UserImage isSmall="true" ${avatarSrc} }}}
        </div>
        <div class="${styles.messageContainer}">
          <span class="${styles.title}">
            {{title}}
          </span>
          <div class="${styles.message}">
            {{message.content}}
          </div>
        </div>
      </div>
    `;
  }
}

export { ChatCard };
