import { UploadFile } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';

interface IProps {}

type Refs = {
  avatar: UploadFile;
};

export class LoadAvatar extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      removeUser: (event: ElementEvents['click']) => {
        event.preventDefault();

        const value = this.refs.avatar.value();

        console.log({ value });

        navigate('signIn');
      },
    });
  }

  render() {
    return `
      {{#> Modal}}
        <div class="loadAvatar shadow">
            <div class="loadAvatar_header">
                {{{ Text size='large' weight='700' text='Загрузите файл' }}}
            </div>
            <form class="loadAvatar_form">
                {{{ UploadFile ref='avatar' id='avatar' name='avatar' }}}
            </form>
            <div class="loadAvatar_actions">
                {{{ Button label="Поменять" type="primary" onClick=loadAvatar }}}
            </div>
        </div>
      {{/Modal}}
    `;
  }
}
