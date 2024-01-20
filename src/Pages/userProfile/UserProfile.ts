import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {
  src?: string;
  alt?: string;
  validate?: {};
  value?: {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    phone?: string;
    display_name?: string;
  };
  changeUserProfile?: (event: ElementEvents['click']) => void;
  exit?: (event: ElementEvents['click']) => void;
  changePassword?: (event: ElementEvents['click']) => void;
}

type Refs = {
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  phone: Input;
  display_name: Input;
};

export class UserProfile extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    const { src = '', alt = '', ...restProps } = props;
    super({
      ...restProps,
      src,
      alt,
      validate: {
        password: validators.password,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
      },
      changeUserProfile: (event: ElementEvents['click']) => {
        event.preventDefault();

        const fields: Array<keyof Refs> = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name'];

        let isValid = true;
        const fieldsValues: Record<string, string> = {};

        fields.forEach(field => {
          const value = this.refs[field].value();
          const isFieldValid = this.refs[field].validate();

          isValid = isValid && isFieldValid;
          fieldsValues[field] = value;
        });

        console.log(fieldsValues);

        if (!isValid) return;

        navigate('signIn');
      },
      exit: (event: ElementEvents['click']) => {
        event.preventDefault();

        navigate('signIn');
      },
      changePassword: (event: ElementEvents['click']) => {
        event.preventDefault();

        navigate('changePassword');
      },
    });
  }

  render() {
    const { src, alt } = this.props;

    return `
      <div class="userProfile">
        <div class="userProfile_container shadow">
          <div class="userProfile_header">
            {{{ Avatar src='${src}' alt='${alt}' }}}
            {{{ Text size='large' weight='700' text=value.first_name }}}
          </div>
          <form class="userProfile_form">
            {{{ Input value=value.email validate=validate.email ref="email" placeholder="Почта" type='email' name='email' id='email' }}}
            {{{ Input value=value.login validate=validate.login ref="login" placeholder="Логин" name='login' id='login' }}}
            {{{ Input value=value.first_name validate=validate.name ref="first_name" placeholder="Имя" name='first_name' id='first_name' }}}
            {{{ Input value=value.second_name validate=validate.name ref="second_name" placeholder="Фамилия" name='second_name' id='second_name' }}}
            {{{ Input value=value.phone validate=validate.phone ref="phone" placeholder="Телефон" name='phone' id='phone' }}}
            {{{ Input value=value.display_name ref="display_name" placeholder="Имя в чате" name='display_name' id='display_name' }}}
          </form>
          <div class="userProfile_actions">
            {{{ Button label="Изменить данные" type="text" onClick=changeUserProfile }}}
            {{{ Button label="Изменить пароль" type="text" onClick=changePassword }}}
            {{{ Button label="Выйти" type="text" danger=true onClick=exit }}}
          </div>
        </div>
      </div>
    `;
  }
}
