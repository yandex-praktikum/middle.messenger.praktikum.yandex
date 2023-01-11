import { Block } from '../../utils/block';
import { IChat } from '../../utils/interfaces'
import template from './chat.hbs';
import './chat.less';
import { withStore } from '../../hocs/with-store';
import Avatar from '../../components/avatar';
import Input from '../../components/input';
import Close from '../../components/close';
import Popup from '../../components/popup';
import Button from '../../components/button';
import ChatsController from '../../controllers/chat-controller';

export class ChatBase extends Block<IChat> {
  constructor(props: IChat) {
    super(props);
  }
  
  init(): void {
    this.children.avatar = new Avatar({
      className: 'chatsAvatar',
      photo:
        this.props.avatar === null
          ? '../../static/images/default-ava.svg'
          : `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
          events: {
            click: () => {

              (this.children.addAvatarPopup as Popup).show();
              console.log('clicked')
            },
          },
    });
    
    this.children.addAvatarPopup = new Popup({
      className: 'popup',
      title: 'Upload file',
      button: new Button({
        label: 'Change',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const formData = new FormData();
            const input: any = document.querySelector('#chatsAvatar');
            formData.append('chatsAvatar', input?.files[0]);

            ChatsController.updateAvatar(formData);

            (this.children.addAvatarPopup as Popup).hide();
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            (this.children.addAvatarPopup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'file',
        placeholder: 'file',
        name: 'chatsAvatar',
        className: 'avatar-validated-input',
      }),
    });
  }

  protected componentDidUpdate(oldProps: IChat, newProps: IChat): boolean {
    (this.children.avatar as Avatar).setProps({
      photo:
        newProps.avatar === null
          ? '../../static/images/default-ava.svg'
          : `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
    });

    return true;
  }

  render() {
    let time = this.props.last_message?.time;
    if (time !== undefined) {
      time = new Date(time).toString().substring(4, 10);
    }

    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
      isMine: true,
      time
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase as any);
