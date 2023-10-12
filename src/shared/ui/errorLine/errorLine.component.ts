import { Component } from "@/shared/model";
import styles from "./errorLine.module.css";

class ErrorLine extends Component {
  protected render(): string {
    return `
      <div class="${styles.errorLine}">{{error}}</div>
    `;
  }
}

export { ErrorLine };
