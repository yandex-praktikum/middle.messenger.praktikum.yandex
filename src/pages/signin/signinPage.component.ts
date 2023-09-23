import { Component } from "@/shared/model";
import styles from "./signinPage.module.css";
import { SigninPageProps } from "./signinPage.types";

class SigninPage extends Component {
  constructor(props: SigninPageProps) {
    super(props);
  }

  protected render() {
    return `
      <div class="${styles.signinPage}">
        {{{ SigninForm }}}
      </div>
    `;
  }
}

export { SigninPage };
