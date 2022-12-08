import { Block, TProperties} from '../../utils/core/block';
import { activeChat } from './active-chat.tmpl';

type TActiveChat = {
  isMine: boolean;
  readed?: boolean;
  text?: string;
  image?: string;
  time: string;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class ActiveChat extends Block<TActiveChat> {
  constructor(props: TActiveChat) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(activeChat, this.props);
  }
}

export { ActiveChat, TActiveChat };
