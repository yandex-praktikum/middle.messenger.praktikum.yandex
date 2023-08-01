import { ArrowLink, Input } from '@components';
import { Block } from '@services';

import { Chat } from '../chat/chat';

import PanelTemplate from './panel.hbs';
import './panel.css';

interface Props {
  chatList: Chat[];
}

interface SuperProps extends Props {
  profileLink: ArrowLink;
  searchInput: Input;
}

export class Panel extends Block<Props> {

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      profileLink: new ArrowLink({ attr: { href: '/profile' }, label: 'Профиль' }),
      searchInput: new Input({
        attr: {
          name: 'search',
          value: '',
          placeholder: 'Поиск'
        }
      })
    };

    super('div', 'panel', superProps);
  }

  render(): DocumentFragment {
    return this.compile(PanelTemplate);
  }
}
