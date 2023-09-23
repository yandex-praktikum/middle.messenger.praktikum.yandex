import { validateLogin, validatePassword } from "@/shared/lib";
import { Component } from "@/shared/model";
import { SigninFormProps } from "./signinForm.types";

class SigninForm extends Component {
  constructor(props: SigninFormProps) {
    super({
      ...props,
      validate: {
        login: validateLogin,
        password: validatePassword,
      },
      onLogin: (event: SubmitEvent) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        if (login && password) {
          console.log({
            login,
            password,
          });
        }
      },
    });
  }

  protected render() {
    return `
      <div>
        {{#> AuthForm title="Вход"}}
          <div>
            {{{ InputField ref="login" label="Логин" name="login" validate=validate.login }}}
            {{{ InputField ref="password" label="Пароль" name="password" type="password" validate=validate.password }}}
          </div>
          <div class="authForm_buttons">
            {{{ Button label="Авторизоваться" type="submit" onClick=onLogin }}} 
          </div>
        {{/AuthForm}}
      </div>
    `;
  }
}

export { SigninForm };
