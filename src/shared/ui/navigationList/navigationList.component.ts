import { Component } from "@/shared/model";
import styles from "./navList.module.css";
import { NavigationListProps } from "./navigationList.types";

class NavigationList extends Component {
  constructor(props: NavigationListProps) {
    super(props);
  }

  protected render(): string {
    return `
      <nav>
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
      </nav>
    `;
  }
}

export { NavigationList };
