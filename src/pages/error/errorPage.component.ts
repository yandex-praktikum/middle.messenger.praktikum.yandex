import { Component } from "@/shared/model";
import styles from "./errorPage.module.css";
import { ErrorPageProps } from "./errorPage.types";

class ErrorPage extends Component {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected render() {
    const { errorCode, errorMessage } = this.props;

    return `
      {{#> layout}}
        <div class="${styles.errorPage}">
          <span class="${styles.errorPageCode}">${errorCode}</span>
          <span class="${styles.errorPageMessage}">${errorMessage}</span>
          <a href="/chat">Назад к чатам</a>
        </div>
      {{/layout}}
    `;
  }
}

export { ErrorPage };
