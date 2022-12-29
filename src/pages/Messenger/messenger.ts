import { Block } from '../../utils/Block';
import ChatsList from '../../components/ChatsList';
import template from './messenger.hbs';
import Messenger from '../../components/Messenger';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';
import Popup from '../../components/Popup';
import Button from '../../components/button';
import Close from '../../components/Close';
import Input from '../../components/input';
import { onSubmit } from '../../utils/OnSubmit';
import Link from '../../components/Link';
import './messenger.less';

export class MessengerPage extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    ChatsController.fetchChats();
    AuthController.fetchUser();

    this.children.chatsList = new ChatsList({
      isLoaded: false
    });

    this.children.messenger = new Messenger({});
    this.children.link = new Link({
      path: '/settings',
      text: 'Profile >',
      className: 'link-to-profile',
    });

    this.children.addChatButton = new Button({
      label: 'Add chat',
      className: 'add-chat-button',
      events: {
        click: () => {
          (this.children.addChatPopup as Popup).show();
        },
      },
    });

    this.children.addChatPopup = new Popup({
      title: 'Add new chat',
      button: new Button({
        label: 'Add',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const input: any = document.querySelector('#chatName');
            const chatName = input.value;
            onSubmit(e, 'chat-validated-input');

            if (chatName !== '') {
              ChatsController.create(chatName);
              input.value = '';
              (this.children.addChatPopup as Popup).hide();
            }
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            const input: any = document.querySelector('#chatName');
            input.value = '';
            (this.children.addChatPopup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'text',
        placeholder: 'chat name',
        name: 'chatName',
        className: 'chat-validated-input',
      }),
    });

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
