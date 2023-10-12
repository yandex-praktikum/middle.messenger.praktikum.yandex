import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "@/shared/lib";
import { Component } from "@/shared/model";
import { SignupFormProps } from "./signupForm.types";
import { AuthController } from "../../api";

class SignupForm extends Component {
  constructor(props: SignupFormProps) {
    const authController = new AuthController();
    super({
      ...props,
      validate: {
        login: validateLogin,
        firstName: validateName,
        secondName: validateName,
        email: validateEmail,
        password: validatePassword,
        phone: validatePhone,
      },
      onSignup: (event: SubmitEvent) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        const firstName = this.refs.firstName.value();
        const secondName = this.refs.secondName.value();
        const phone = this.refs.phone.value();
        const email = this.refs.email.value();

        if (login && firstName && secondName && phone && email && password) {
          authController.signup({
            login,
            password,
            first_name: firstName,
            second_name: secondName,
            phone,
            email,
          });
        }
      },
    });
  }

  protected render() {
    return `
      <div>
        {{#> AuthForm title="Регистрация"}}
          <div>
            {{{ InputField ref="firstName" type="text" label="Имя" name="first_name" validate=validate.firstName }}}
            {{{ InputField ref="secondName" type="text" label="Фамилия" name="second_name" validate=validate.secondName }}}
            {{{ InputField ref="login" type="text" label="Логин" name="login" validate=validate.login}}}
            {{{ InputField ref="email" type="text" label="Адрес почты" name="email" validate=validate.email }}}
            {{{ InputField ref="password" type="password" label="Пароль" name="password" validate=validate.password }}}
            {{{ InputField ref="phone" type="text" label="Номер телефона" name="phone" validate=validate.phone }}}
          </div>
          <div class="authForm_buttons">
            {{{ Button label="Зарегистрироваться" onClick=onSignup }}} 
          </div>
        {{/AuthForm}}
      </div>
    `;
  }
}

export { SignupForm };
