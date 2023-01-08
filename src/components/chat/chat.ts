import { Block } from '../../utils/block';
import template from './chat.hbs';
import './chat.less';
import { withStore } from '../../hocs/with-store';
import { IChat } from '../../utils/interfaces';
import Input from '../../components/input';
import Close from '../../components/close';
import Popup from '../../components/popup';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
//import Link from '../../components/link';
import UserController from '../../controllers/user-controller';
import AuthController from '../../controllers/auth-controller';
//import Fields from '../../components/fields';
//import Field from '../../components/field';
//import { IProfilePageBase, IProfileInfo } from '../../utils/interfaces'

export class ChatBase extends Block {
  constructor(props: IChat) {
    super(props);
  }

 async componentDidMount() {
  await AuthController.fetchUser();
 }

  init(): void {
    this.children.avatar = new Avatar({
      className: 'avatar',
      photo:
        this.props.avatar === null
          ? '../../static/images/default-ava.svg'
          : `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
          events: {
            click: () => {

              (this.children.popup as Popup).show();
              console.log('clicked')
            },
          },
    });
    
    this.children.popup = new Popup({
      className: 'popup-avatar',
      title: 'Upload file',
      button: new Button({
        label: 'Change',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const formData = new FormData();
            const input: any = document.querySelector('#avatar');

            formData.append('avatar', input?.files[0]);

            UserController.updateAvatar(formData);
            (this.children.popup as Popup).hide();
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            (this.children.popup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'file',
        placeholder: 'file',
        name: 'avatar',
        className: 'avatar-validated-input',
      }),
    });
  }

  protected componentDidUpdate(
    _oldProps: IChat,
    newProps: IChat
  ): boolean {
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
      time = new Date(time).toString().substring(3, 10);
    }

    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
      isMine: true,
      time,
    });
    
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),

}));

export const Chat = withSelectedChat(ChatBase as any);
