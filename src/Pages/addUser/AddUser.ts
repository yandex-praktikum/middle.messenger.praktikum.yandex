import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';
import * as validators from '../../services/Validators';

interface IProps {}

type Refs = {
  login: Input;
};

export class AddUser extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      validate: {
        login: validators.login,
      },
      addUser: (event: ElementEvents['click']) => {
        event.preventDefault();

        const login = this.refs.login.value();
        const isValid = this.refs.login.validate();

        console.log({ login });

        if (!isValid) return;

        navigate('signIn');
      },
    });
  }

  render() {
    return `
      {{#> Modal}}
        <div class="addUser shadow">
            <div class="addUser_header">
                {{{ Text size='large' weight='700' text='Добавить пользователя' }}}
            </div>
            <form class="addUser_form">
                {{{ Input ref='login' validate=validate.login placeholder="Логин" name='login' id='login' }}}
            </form>
            <div class="addUser_actions">
                {{{ Button label="Добавить" type="primary" onClick=addUser }}}
            </div>
        </div>
      {{/ Modal }}
    `;
  }
}
