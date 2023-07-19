import Block from '../../utils/Block.js';
import store from '../../utils/Store';
import { Routes } from '../../../index.js';
import { User } from '../../api/AuthAPI.js';
import ChatsController from '../../controllers/ChatsController.js';
import MessageController from '../../controllers/MessagesController.js';
import UserController from '../../controllers/UserController.js';
import {
  clearFormInputs,
  formDataToJson,
  setStyles,
  redirect,
} from '../../utils/Helpers.js';

import { Button, ButtonAwesome } from '../../components/Buttons/buttons.js';
import { Tag } from '../../components/Tags/tags.js';
import { Input } from '../../components/Input/input.js';
import { SearchForm } from '../../components/SearchForm/searchForm.js';
import {
  Container,
  ContainerSendMessage,
} from '../../components/Containers/containers.js';
import { ChatsList } from '../../components/ChatsList/chatList.js';
import { Messages } from '../../components/Messages/messages.js';
import { ChatTop } from '../../components/ChatTop/chatTop.js';
import { Form } from '../../components/Form/form.js';
import { template } from './messenger.templ.js';
import * as styleMainsDefs from '../../scss/styles.module.scss';
import * as stylesDefs from './styles.module.scss';
import { SendMessage } from '../../components/sendMessage/sendMessage.js';

const stylesMain = styleMainsDefs.default;
const styles = stylesDefs.default;

type PopupAttributes = {
  inputs: {
    name: string;
    label: string;
    type?: string;
    accept?: string;
  }[];
  title: string;
  button: string;
  submit: (e: Event) => Promise<void>;
};
type PopupNames =
  | 'createNewChatPopup'
  | 'addUserPopup'
  | 'removeUserPopup'
  | 'editChatPopup';

type PopupsData = Record<PopupNames, PopupAttributes>;

export class MessengerPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.loadChats();

    // LEFT PANEL
    const profileButton = new ButtonAwesome({
      icon: 'fa-regular fa-user',
      title: 'Profile',
      classes: ['profile-button'],
      events: {
        click: () => redirect({ url: Routes.Profile }),
      },
    });

    const createChatButton = new ButtonAwesome({
      icon: 'fa-regular fa-square-plus',
      title: 'Add new chat',
      classes: ['create-new-button'],
      events: {
        click: () => this.openPopup('createNewChatPopup'),
      },
    });

    this.children.search = new Container({
      content: [new SearchForm(), createChatButton, profileButton],
      classes: ['tools-container'],
    });

    this.children.chats = new ChatsList({ chats: [], isLoaded: false });

    // RIGHT PANEL
    const addUserButton = new ButtonAwesome({
      icon: 'fa fa-user-plus',
      title: 'Add user',
      events: {
        click: () => this.openPopup('addUserPopup'),
      },
    });
    const removeUserButton = new ButtonAwesome({
      icon: 'fa fa-user-minus',
      title: 'removeUser',
      events: {
        click: () => this.openPopup('removeUserPopup'),
      },
    });
    const editChatButton = new ButtonAwesome({
      icon: 'far fa-edit',
      title: 'Edit Profile',
      events: {
        click: () => this.openPopup('editChatPopup'),
      },
    });

    const deleteChatButton = new ButtonAwesome({
      icon: 'fa fa-times',
      title: 'Delete chat',
      events: {
        click: () => this.deleteChatSubmit(),
      },
    });

    this.children.topChat = new ChatTop({
      selected: true,
      buttons: {
        addUserButton,
        removeUserButton,
        editChatButton,
        deleteChatButton,
      },
    });

    this.children.messages = new Messages({ messages: [], isLoaded: false });

    this.children.sendMessage = new SendMessage();

    // POPUPS
    this.children.createNewChatPopup = this.createPopup('createNewChatPopup');
    this.children.addUserPopup = this.createPopup('addUserPopup');
    this.children.removeUserPopup = this.createPopup('removeUserPopup');
    this.children.editChatPopup = this.createPopup('editChatPopup');
  }

  async loadChats() {
    const res = await ChatsController.fetchChats();
    if (res?.success) {
      this.setProps({
        isLoaded: true,
      });
    }
  }

  async createNewChatSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const data = formDataToJson(formData);
    const { title } = data as Record<string, string>;
    if (title) {
      this.closePopup('createNewChatPopup');
      const res = await ChatsController.createChat(title);
      if (!res.success) {
        alert(`Couldn't create chat". ${JSON.stringify(res.error)}`);
        return;
      }
    }
    clearFormInputs(form);
  }

  async deleteChatSubmit() {
    const id = store.getState().selectedChat;
    if (!id) return;
    const { title } = store.getChatById(id);
    if (window.confirm(`Do you want to delete chat ${title}?`)) {
      const res = await ChatsController.deleteChat(id);
      if (!res.success) {
        alert(`Couldn't delete chat". ${JSON.stringify(res.error)}`);
        return;
      }
    }
  }

  async addUserSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const data = formDataToJson(formData);
    const { login } = data as Record<string, string>;
    const chatId = store.getState().selectedChat;
    const { title } = store.getChatById(chatId);
    const res = await UserController.getUsersByLogin({ login });
    if (!res.success) {
      alert(
        `There were some problems finding users. ${JSON.stringify(res.error)}`
      );
      return;
    }
    const matches = res.users as User[];
    const user = matches?.filter((user) => user.login === login)[0];

    if (!user) {
      alert(
        `User with this login wasn't found.\n
        Here is the list of users with similar logins:\n 
        ${matches.map((user) => user.login).join('\n')}`
      );
      return;
    }

    const chatUsers = store.getChatUsers() as User[];
    const exists = chatUsers.map((user) => user.id).includes(user.id);
    if (exists) {
      alert(`User ${user.login} is already a member of the chat "${title}"`);
      return;
    }

    try {
      await ChatsController.addUserToChat(chatId, user.id);
      MessageController.sendMessage(
        chatId,
        `User ${user.login} was addded to chat "${title}" by ${
          store.getUser().login
        }`
      );
    } catch {
      alert(`Couldn't add user ${user.login} to the chat "${title}"`);
      return;
    }

    this.closePopup('addUserPopup');
    clearFormInputs(form);
  }

  async removeUserSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const data = formDataToJson(formData);
    const { login } = data as Record<string, string>;
    const myId = store.getUser().id;
    const chatId = store.getState().selectedChat;
    const { title } = store.getChatById(chatId);
    const users = store
      .getChatUsers()
      .filter((user: User) => user.id !== myId) as User[];
    const user = users.filter((user) => user.login === login)[0];

    if (!user) {
      alert(
        `User with this login is not a member of the chat.\n
        Here is the list of users of the chat:\n 
        ${users.map((user: User) => user.login).join('\n')}`
      );
      return;
    }

    const res = await ChatsController.removeUserFromChat(chatId, user.id);
    if (!res.success) {
      alert(
        `Couldn't remove user ${user.login} chat "${title}". ${JSON.stringify(
          res.error
        )}`
      );
      return;
    }

    MessageController.sendMessage(
      chatId,
      `User ${user.login} was removed from the chat "${title}" by ${
        store.getUser().login
      }`
    );
    this.closePopup('removeUserPopup');
    clearFormInputs(form);
  }

  async editChatSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    formData.set('chatId', store.getState().selectedChat);
    const res = await ChatsController.editChatAvatar(formData);
    if (res.success) {
      alert('Chat avatar updated');
    } else {
      alert(
        `There were some problems updating chat avatar. ${JSON.stringify(
          res.error
        )}`
      );
      return;
    }
    clearFormInputs(form);
    this.closePopup('editChatPopup');
  }

  createPopup(popupName: PopupNames) {
    const popupsData: PopupsData = {
      createNewChatPopup: {
        title: 'Create Chat',
        inputs: [
          {
            name: 'title',
            label: 'Enter name for the new chat',
          },
        ],

        button: 'Create chat',
        submit: this.createNewChatSubmit.bind(this),
      },

      addUserPopup: {
        title: 'Add user to the Chat',
        inputs: [
          {
            name: 'login',
            label: 'Enter login of the user to add',
          },
        ],

        button: 'Add user',
        submit: this.addUserSubmit.bind(this),
      },
      removeUserPopup: {
        title: 'Remove user from the chat',
        inputs: [
          {
            name: 'login',
            label: 'Enter login of the user to remove',
          },
        ],

        button: 'Remove user',
        submit: this.removeUserSubmit.bind(this),
      },
      editChatPopup: {
        title: 'Change chat Avatar',
        inputs: [
          {
            name: 'avatar',
            label: 'Select avatar',
            type: 'file',
            accept: '.jpg,.jpeg,.png',
          },
        ],

        button: 'Change avatar',
        submit: this.editChatSubmit.bind(this),
      },
    };
    const { title, inputs, button, submit } = popupsData[popupName];

    const inputBlocks = inputs.map((input) => {
      const { name, label, type, accept } = input;
      return new Container({
        classes: ['input-container'],
        content: [
          new Tag({
            tag: 'label',
            content: label,
            for: name,
          }),
          new Input({
            name,
            type: type || 'text',
            accept: accept || '',
            placeholder: label,
            required: true,
            validate: false,
            classes: ['input-square'],
          }),
        ],
      });
    });
    return new Container({
      content: [
        new Container({
          content: [
            new Form({
              title,
              inputs: inputBlocks,
              buttons: [
                new Button({
                  label: button,
                  type: 'submit',
                }),
                new Button({
                  label: 'Cancel',
                  classes: ['button-cancel'],
                  events: {
                    click: () => this.closePopup(popupName),
                  },
                }),
              ],
              events: {
                submit: (e) => submit(e),
              },
            }),
          ],
          classes: ['form-container'],
        }),
      ],
      classes: ['overlay-container'],
    });
  }

  openPopup(popupName: PopupNames) {
    const block = this.children[popupName] as Block;
    const popup = block.getContent() as HTMLElement;
    if (popup) {
      setStyles(popup, {
        display: 'inline-block',
      });
    }
  }

  closePopup(popupName: PopupNames) {
    const block = this.children[popupName] as Block;
    const popup = block.getContent() as HTMLElement;
    if (popup) {
      setStyles(popup, {
        display: 'none',
      });
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles, stylesMain });
  }
}
