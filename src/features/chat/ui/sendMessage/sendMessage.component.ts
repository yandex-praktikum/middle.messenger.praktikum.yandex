import { Component } from "@/shared/model";
import clipIcon from "@/assets/clip.svg";
import arrowIcon from "@/assets/arrow.svg";
import styles from "./sendMessage.module.css";
import { ChatAPI } from "@/shared/api";

class SendMessage extends Component {
  constructor() {
    super({
      onClipClick: () => {},
      onSendClick: (event: SubmitEvent) => {
        event.preventDefault();
        const message = this.refs.message.value();
        const { chatSocket } = window.store.getState();
        chatSocket?.sendMessage(message);
      },
    });
  }
  protected render() {
    return `
      <form class="${styles.sendMessage}">
        {{{ IconButton src="${clipIcon}" onClick=onClipClick type="button" customClass="${styles.clipButton}" }}}
        {{{ Input placeholder="Собщение..." ref="message" value="" }}}
        {{{ IconButton src="${arrowIcon}" onClick=onSendClick type="button" customClass="${styles.sendButton}" }}}
      </form>
    `;
  }
}

export { SendMessage };
