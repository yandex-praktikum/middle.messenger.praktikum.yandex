import { Component } from "@/shared/model";
import styles from "./navList.module.css";

class NavigationList extends Component {
  protected render(): string {
    return `
      <ul class="${styles.navigationList}">
        <li><a href="/">home page</a></li>
        <li><a href="/signin">signin page</a></li>
        <li><a href="/signup">signup page</a></li>
        <li><a href="/profile">profile page</a></li>
        <li><a href="/chat">chats page</a></li>
        <li><a href="/not-found">not found error page</a></li>
        <li><a href="/error">server error page</a></li>
        <li><a href="/profile-edit">edit profile page</a></li>
        <li><a href="/password-edit">password edit page</a></li>
      </ul>
    `;
  }
}

export { NavigationList };
