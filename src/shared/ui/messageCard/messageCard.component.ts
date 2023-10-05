import { Component } from "@/shared/model";
import { MessageCardProps } from "./messageCard.types";
import styles from "./messageCard.module.css";

class MessageCard extends Component {
  constructor(props: MessageCardProps) {
    super(props);
  }

  public render() {
    return `
      <div class="${styles.messageCard}">
        {{ content }}
      </div>
    `;
  }
}

export { MessageCard };
