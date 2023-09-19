import { Component } from "@/shared/model";
import styles from "./signinPage.module.css";

class SigninPage extends Component {
  protected render() {
    return `
      <div class="${styles.signinPage}">
        {{{ SigninForm }}}
      </div>
    `;
  }
}

export { SigninPage };
