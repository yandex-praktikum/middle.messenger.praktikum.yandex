import { Component } from "@/shared/model";
import arrowIcon from "@/assets/arrow.svg";
import styles from "./sendMessage.module.css";

class SendMessage extends Component {
  constructor() {
    super({
      onClipClick: () => {},
      onSendClick: (event: SubmitEvent) => {
        event.preventDefault();
        const message = this.refs.message.value();
        if (message === "") {
          return;
        }
        const { chatSocket } = window.store.getState();
        chatSocket?.sendMessage(message);
      },
    });
  }
  protected render() {
    return `
      <form class="${styles.sendMessage}" onsubmit="event.preventDefault()">
        {{{ Input placeholder="Собщение..." ref="message" value="" }}}
        {{{ IconButton src="${arrowIcon}" onClick=onSendClick type="button" customClass="${styles.sendButton}" }}}
      </form>
    `;
  }
}

export { SendMessage };
