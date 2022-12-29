import { Block } from '../../utils/Block';
import { IMessenger } from '../../utils/Interfaces';
import { onSubmit } from '../../utils/OnSubmit';
import Button from '../Button';
import template from './messenger.hbs';
import MessagesController from '../../controllers/MessagesController';
import './messenger.less';
import Input from '../Input';
import { withStore } from '../../hocs/WithStore';
import Message from '../Message';
import Close from '../Close';
import Popup from '../Popup';
import ChatsController from '../../controllers/ChatsController';


export class MessengerBase extends Block {
  constructor(props: IMessenger) {
    super({ ...props });
  }

  protected init() {
    this.children.settingsButton = new Button({
      label: '⋮',
      className: 'settings-button',
      events: {
        click: () => {
          const settingsPopup = document.querySelector('.settings-popup');
          (settingsPopup as HTMLElement).classList.toggle('visible');
        },
      },
    });

    this.children.attachButton = new Button({
      label: '',
      className: 'attach-button',
      events: {
        click: () => {
          const settingsPopup = document.querySelector('.attach-popup');
          (settingsPopup as HTMLElement).classList.toggle('visible');
        },
      },
    });

    this.children.addUserButton = new Button({
      label: 'add user',
      className: 'add-user-button',
      events: {
        click: () => {
          (this.children.addUserPopup as Popup).show();
        },
      },
    });

    this.children.deleteUserButton = new Button({
      label: 'delete user',
      className: 'delete-user-button',
      events: {
        click: () => {
          (this.children.deleteUserPopup as Popup).show();
        },
      },
    });

    this.children.addUserPopup = new Popup({
      title: 'Add user to chat',
      button: new Button({
        label: 'Add',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const input: any = document.querySelector('#addUserId');
            const userId = input.value;
            onSubmit(e, 'add-user-validated-input');
            console.log('userId', userId);
            if (userId !== '') {
              ChatsController.addUserToChat(this.props.selectedChat, userId);
              input.value = '';
              (this.children.addUserPopup as Popup).hide();
            }
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            const input: any = document.querySelector('#addUserId');
            input.value = '';
            (this.children.addUserPopup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'text',
        placeholder: 'user Id',
        name: 'addUserId',
        className: 'add-user-validated-input',
      }),
    });

    this.children.deleteUserPopup = new Popup({
      title: 'Delete user from chat',
      button: new Button({
        label: 'Delete',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const input: any = document.querySelector('#deleteUserId');
            const userId = input.value;
            onSubmit(e, 'delete-user-validated-input');

            if (userId !== '') {
              ChatsController.deleteUserFromChat(
                this.props.selectedChat,
                userId
              );
              input.value = '';
              (this.children.deleteUserPopup as Popup).hide();
            }
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            const input: any = document.querySelector('#deleteUserId');
            input.value = '';
            (this.children.deleteUserPopup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'text',
        placeholder: 'user Id',
        name: 'deleteUserId',
        className: 'delete-user-validated-input',
      }),
    });

    this.children.messages = this.createMessages({ ...this.props });

    this.children.input = new Input({
      type: 'text',
      placeholder: 'Message',
      name: 'message',
      label: '',
      className: 'validated-input',
      noError: true,
      divClass: 'message-input-block',
    });

    this.children.sendButton = new Button({
      label: '->',
      type: 'submit',
      className: 'send',
      events: {
        click: (e) => {
          const input: any = document.querySelector('#message');
          const message = input.value;
          onSubmit(e, 'validated-input');
          if (message !== '') {
            MessagesController.sendMessage(this.props.selectedChat!, message);
            input.value = '';
          }
        },
      },
    });
  }

  protected componentDidUpdate(_oldProps: IMessenger, newProps: IMessenger): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: any) {
    return props.messages.map((data: any) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  render() {
    const chat = this.props.chats.filter(
      (chat: Record<string, number>) => chat.id === this.props.selectedChat
    );

    const avatar = this.props.chats.filter(
      (avatar: Record<string, number>) => avatar.id === this.props.selectedChat
    )

    return this.compile(template, {
      ...this.props,
      title: chat[0]?.title,
      avatar: avatar[0]?.avatar,
    });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      chats: [...(state.chats || [])],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase as any);
