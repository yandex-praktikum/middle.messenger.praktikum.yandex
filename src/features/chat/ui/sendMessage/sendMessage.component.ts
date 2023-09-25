import { Component } from "@/shared/model";
import clipIcon from "@/assets/clip.svg";
import arrowIcon from "@/assets/arrow.svg";
import styles from "./sendMessage.module.css";

class SendMessage extends Component {
  constructor() {
    super({
      onClipClick: () => {},
      onSendClick: (event: SubmitEvent) => {
        event.preventDefault();

        console.log({ message: this.refs.message.value() });
      },
    });
  }
  protected render() {
    return `
      <form class="${styles.sendMessage}">
        {{{ IconButton src="${clipIcon}" onClick=onClipClick type="button" customClass="${styles.clipButton}" }}}
        {{{ Input placeholder="Собщение..." ref="message" }}}
        {{{ IconButton src="${arrowIcon}" onClick=onSendClick type="button" customClass="${styles.sendButton}" }}}
      </form>
    `;
  }
}

export { SendMessage };
