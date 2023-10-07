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
          <li><a href="/">home</a></li>
          <li><a href="/sign-up">signup</a></li>
          <li><a href="/profile">profile</a></li>
          <li><a href="/messenger">messenger</a></li>
          <li><a href="/settings">edit profile</a></li>
        </ul>
      </nav>
    `;
  }
}

export { NavigationList };
