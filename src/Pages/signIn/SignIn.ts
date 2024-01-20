import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {}

type Refs = {
  login: Input;
  password: Input;
};

export class SignInPage extends Component<IProps, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onSignIn: (event: ElementEvents['click']) => {
        event.preventDefault();

        const login = this.refs.login.value();
        const password = this.refs.password.value();

        if (!login) {
          return;
        }

        console.log({
          login,
          password,
        });

        navigate('list');
      },
      onSignUp: (event: ElementEvents['click']) => {
        event.preventDefault();

        navigate('signUp');
      },
    });
  }

  render() {
    return `
      <div class="signIn_container shadow">
        <div class="signIn_header">
          {{{ Text size='large' weight='700' text='Вход' }}}
        </div>
        <form class="signIn_form">
          {{{ Input placeholder="Логин" ref="login" name='login' id='login' validate=validate.login }}}
          {{{ Input placeholder="Пароль" ref="password" type='password' name='password' id='password' validate=validate.password }}}
        </form>
        <div class="signIn_actions">
          {{{ Button label="Авторизоваться" type="primary" onClick=onSignIn }}}
          {{{ Button label="Нет аккаунта ?" type="text" onClick=onSignUp }}}
        </div>
      </div>
    `;
  }
}
