import { Component } from "@/shared/model";
import styles from "./signupPage.module.css";
import { SignupPageProps } from "./signupPage.types";

class SignupPage extends Component {
  constructor(props: SignupPageProps) {
    super(props);
  }

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
