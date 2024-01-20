import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { navigate } from '../../services/Navigate';

interface IProps {
  toChats?: (event: ElementEvents['click']) => void;
}

export class NotFound extends Component<IProps> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      toChats: () => {
        navigate('chat');
      },
    });
  }

  render() {
    return `
    <div class="notFound">
      <div class="notFound_container shadow">
          <span class="notFound_status">404</span>
          {{{ Text text="Не туда попали" type='primary' size='large' }}}
          {{{ Button type='text' label='Назад к чатам' onClick=toChats }}}
      </div>
    </div>
    `;
  }
}
