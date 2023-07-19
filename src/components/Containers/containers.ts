import Block from '../../utils/Block';
import {
  templateBlank,
  templateContainer,
  templateRm,
  templateLm,
  templateSendMessage,
  templateScroller,
} from './container.templ';
import { ButtonAwesome } from '../../components/Buttons/buttons.js';
import { TextArea } from '../TextArea/textarea.js';
import { ChatInfo } from '../../api/ChatsAPI.js';
import MessageController from '../../controllers/MessagesController.js';
import * as stylesDefs from './styles.module.scss';
import store from '../../utils/Store.js';
import { Avatar } from '../Avatar/avatar.js';

const styles = stylesDefs.default;

type events = {
  [key: string]: () => void;
};

// general container, div classes can be passed as props
interface ContainerProps {
  content?: Block[];
  classes?: string[];
  events?: events;
}

export class Container extends Block {
  constructor(props: ContainerProps) {
    super({ ...props });
  }
  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c: string) => styles[c]);
    }
  }

  render() {
    return this.compile(templateContainer, { ...this.props });
  }
}

// container for chats in the left panel
export interface ContainerChatProps extends ChatInfo {
  selected: boolean;
  events?: {
    click: () => void;
  };
}

// container for the header above messages in the rigth panel
// container for messages in the right panel
interface ContainerMessageProps extends ContainerProps {
  messageTemplate?: (context: any) => string;
  author: string;
  avatar: string | null;
  hideAvatar: boolean;
  message: string;
  date: string;
}

export class ContainerMessage extends Block<ContainerMessageProps> {
  constructor(props: ContainerMessageProps) {
    super({ ...props });
  }

  init() {
    this.props.messageTemplate =
      this.props.author === 'You' ? templateRm : templateLm;
  }
  render() {
    this.children.avatar = new Avatar({
      title: this.props.author,
      src: this.props.avatar,
    });
    if (this.props.hideAvatar) {
      this.children.avatar.setProps({ classes: ['hidden'] });
    }
    if (this.props.messageTemplate) {
      const { messageTemplate, ...props } = this.props;
      return this.compile(messageTemplate, { ...props, styles });
    }
    return this.compile(templateBlank, { ...this.props, styles });
  }
}

// container for sendMessages
export class ContainerSendMessage extends Block {
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

export class ContainerScroller extends Container {
  constructor(props: ContainerProps) {
    super({ ...props });
  }
  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c: string) => styles[c]);
    }
  }

  render() {
    return this.compile(templateScroller, { ...this.props, styles });
  }
}
