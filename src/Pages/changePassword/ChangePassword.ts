import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {
  src?: string;
  alt?: string;
  validate?: {};
  changePassword?: (event: ElementEvents['click']) => void;
}

type Refs = {
  oldPassword: Input;
  newPassword: Input;
  newPassword_2: Input;
};

export class ChangePassword extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    const { src = '', alt = '', ...restProps } = props;
    super({
      ...restProps,
      src,
      alt,
      validate: {
        password: validators.password,
      },
      changePassword: (event: ElementEvents['click']) => {
        event.preventDefault();

        const fields: Array<keyof Refs> = ['oldPassword', 'newPassword', 'newPassword_2'];

        let isValid = true;
        const fieldsValues: Record<string, string> = {};

        fields.forEach(field => {
          const value = this.refs[field].value();
          const isFieldValid = this.refs[field].validate();

          isValid = isValid && isFieldValid;
          fieldsValues[field] = value;
        });

        console.log({ fieldsValues });

        if (!isValid) return;

        navigate('signIn');
      },
    });
  }

  render() {
    const { src, alt } = this.props;

    return `
      <div class="changePassword">
        <div class="changePassword_container shadow">
          <div class="changePassword_header">
            {{{ Avatar src='${src}' alt='${alt}' }}}
          </div>
          <form class="changePassword_form">
            {{{ Input ref='oldPassword' validate=validate.password placeholder="Старый пароль" name='oldPassword' id='oldPassword' type='password' }}}
            {{{ Input ref='newPassword' validate=validate.password  placeholder="Новый пароль" name='newPassword' id='newPassword' type='password' }}}
            {{{ Input ref='newPassword_2' validate=validate.password placeholder="Повторите новый пароль" name='newPassword_2' id='newPassword_2' type='password' }}}
          </form>
          <div class="changePassword_actions">
            {{{ Button label="Сохранить" type="primary" onClick=changePassword }}}
          </div>
        </div>
      </div>
    `;
  }
}
