import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {}

type Refs = {
  login: Input;
};

export class RemoveUser extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      validate: {
        login: validators.login,
      },
      removeUser: (event: ElementEvents['click']) => {
        event.preventDefault();

        const value = this.refs.login.value();
        const isValid = this.refs.login.validate();

        console.log({ value });
        if (!isValid) return;

        navigate('signIn');
      },
    });
  }

  render() {
    return `
    {{#> Modal}}
      <div class="removeUser shadow">
          <div class="removeUser_header">
              {{{ Text size='large' weight='700' text='Удалить пользователя' }}}
          </div>
          <form class="removeUser_form">
              {{{ Input ref='login' validate=validate.login placeholder="Логин" name='login' id='login' }}}
          </form>
          <div class="removeUser_actions">
              {{{ Button label="Удалить" type="primary" onClick=removeUser }}}
          </div>
      </div>
      {{/Modal}}
    `;
  }
}
