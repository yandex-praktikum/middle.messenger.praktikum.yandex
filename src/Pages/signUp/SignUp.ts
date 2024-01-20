import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {}

type Refs = {
  login: Input;
  email: Input;
  firstName: Input;
  secondName: Input;
  phone: Input;
  password: Input;
};

export class SignUpPage extends Component<IProps, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        email: validators.email,
        phone: validators.phone,
        password: validators.password,
        name: validators.name,
      },
      onSignIn: (event: ElementEvents['click']) => {
        event.preventDefault();

        navigate('signIn');
      },
      register: (event: ElementEvents['click']) => {
        event.preventDefault();

        const fields: Array<keyof Refs> = ['login', 'email', 'firstName', 'secondName', 'phone', 'password'];
        let isValid = true;
        const fieldsValues: Record<string, string> = {};

        fields.forEach(field => {
          const isFieldValid = this.refs[field].validate();
          const fieldValue = this.refs[field].value();

          isValid = isValid && isFieldValid;
          fieldsValues[field] = fieldValue;
        });

        console.log(fieldsValues);

        if (!isValid) return;

        navigate('list');
      },
    });
  }

  render() {
    return `
      <div class="signUp_container shadow">
        <div class="signUp_header">
          {{{ Text size='large' weight='700' text='Регистрация' }}}
        </div>
        <form class="singUp_form">
          {{{ Input ref='email' validate=validate.email placeholder="Почта" type='email' name='email' id='email' }}}
          {{{ Input ref='login' validate=validate.login placeholder="Логин" name='login' id='login' }}}
          {{{ Input ref='firstName' validate=validate.name placeholder="Имя" name='first_name' id='first_name' }}}
          {{{ Input ref='secondName' validate=validate.name placeholder="Фамилия" name='second_name' id='second_name' }}}
          {{{ Input ref='phone' validate=validate.phone placeholder="Телефон" name='phone' id='phone' }}}
          {{{ Input ref='password' validate=validate.password placeholder="Пароль" type='password' name='password' id='password' }}}
          {{{ Input ref='passwordRepeat' validate=validate.password placeholder="Повторите пароль" type='password' name='password_repeat' id='password_repeat' }}}
        </form>
        <div class="signUp_actions">
          {{{ Button label="Зарегистрироваться" type="primary" onClick=register }}}
          {{{ Button label="Войти" type="text" onClick=signIn }}}
        </div>
      </div>
  `;
  }
}
