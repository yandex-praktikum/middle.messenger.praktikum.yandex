import { Component } from "@/shared/model";

class SigninForm extends Component {
  protected render() {
    return `
<div>
      {{#> AuthForm}}
123
      {{/AuthForm}}
</div>
    `;
  }
}

export { SigninForm };
