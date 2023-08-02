import { ArrowLink, Button, CreateChat, Input, Modal } from '@components';
import { Block } from '@services';
import { SETTINGS_PATH } from '@constants';
import { isEnterEvent } from '@utilities';

import { Chat } from '../chat/chat';

import PanelTemplate from './panel.hbs';
import './panel.css';

interface Props {
  chatList: Chat[];
}

interface SuperProps extends Props {
  profileLink: ArrowLink;
  searchInput: Input;
	searchButton: Button;
	addChatButton: Button;
}

export class Panel extends Block<SuperProps> {

	allUserChats: Chat[];

	addChatModal = new Modal({ content: new CreateChat() });

  constructor(props: Props) {
    const superProps: SuperProps = {
      ...props,
      profileLink: new ArrowLink({ attr: { href: SETTINGS_PATH }, label: 'Профиль' }),
      searchInput: new Input({
        attr: {
          name: 'search',
          value: '',
          placeholder: 'Поиск'
        },
				onKeyUp: e => isEnterEvent(e) && this.searchChats()
			}),
			searchButton: new Button({
				imgSrc: 'icons/search.svg',
				rounded: true,
				onClick: () => this.searchChats()
			}),
			addChatButton: new Button({
				imgSrc: 'icons/plus.svg',
				rounded: true,
				onClick: () => this.addChatModal.show()
			})
    };

    super('div', 'panel', superProps);

		this.allUserChats = this.props.chatList;
  }

	searchChats() {
		const value = this.props.searchInput.getValue();

		const chatList = this.allUserChats.filter(chat => chat.chat.title.includes(value));
		this.setProps({ chatList });
	}

	componentWillUnmount() {
		this.addChatModal.componentWillUnmount();
	}

	render(): DocumentFragment {
    return this.compile(PanelTemplate);
  }
}
