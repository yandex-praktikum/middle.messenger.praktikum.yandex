import Block from '../../utils/Block';
import { templateSendMessage } from './sendMessgae.js';
import { ButtonAwesome } from '../../components/Buttons/buttons.js';
import { TextArea } from '../TextArea/textarea.js';
import MessageController from '../../controllers/MessagesController.js';
import * as stylesDefs from './styles.module.scss';
import store from '../../utils/Store.js';

const styles = stylesDefs.default;

// container for sendMessages
export class SendMessage extends Block {
  constructor() {
    super({});
  }

  init() {
    const buttons = {
      send: {
        icon: 'fa-regular fa-paper-plane',
        title: 'Send',
        classes: ['send-button'],
        events: {
          click: this.send.bind(this),
        },
      },
      image: {
        icon: 'fa-regular fa-image',
        title: 'Attach Image',
        events: {
          click: () => console.log('AttachImage'),
        },
      },
      attachment: {
        icon: 'fa-solid fa-paperclip',
        title: 'Attach document',
        events: {
          click: () => console.log('Attach Doc'),
        },
      },
    };
    Object.entries(buttons).forEach(([key, value]) => {
      const id = `button-${key}`;
      this.children[id] = new ButtonAwesome(value);
    });

    this.children.textarea = new TextArea({
      name: 'message',
    });
  }

  send() {
    const textarea = this.children.textarea as TextArea;
    const value = textarea.getValue();
    if (value !== '') {
      textarea.setValue('');
      const chatId = store.getState().selectedChat;
      MessageController.sendMessage(chatId, value);
    }
  }

  render() {
    return this.compile(templateSendMessage, { ...this.props, styles });
  }
}
