import { Component } from "@/shared/model";

class SigninForm extends Component {
  constructor() {
    super({
      validate: {
        login: (value: string) =>
          value.length < 3 && value.length !== 0
            ? `Length of login should not be less 3 letters.`
            : "",
      },
      onLogin: (event: SubmitEvent) => {
        event.preventDefault();
        const login = this.refs.login.element.value();
        const password = this.refs.password.element.value();

        console.log({
          login,
          password,
        });
      },
    });
  }

  protected render() {
    return `
      <div>
        {{#> AuthForm title="Вход"}}
          <div>
            {{{ InputField label="Логин" name="login" validate=validate.login}}}
            {{{ InputField label="Пароль" name="password"}}}
          </div>
          <div class="authForm_buttons">
            {{{ Button label="Авторизоваться" }}} 
          </div>
        {{/AuthForm}}
      </div>
    `;
  }
}

export { SigninForm };
