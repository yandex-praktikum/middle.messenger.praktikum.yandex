import { Component } from "@/shared/model";
import styles from "./signupPage.module.css";

class SignupPage extends Component {
  protected render() {
    return `
      {{#> layout }}
        <div class="${styles.signupPage}">
          {{{ SignupForm }}}
        </div>
      {{/layout }}
    `;
  }
}

export { SignupPage };
