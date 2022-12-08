import { Block, TProperties} from '../../utils/core/block';
import { chatHeader } from './chat-header.tmpl';
import { Button } from '../button/button';

type TChatHeader = {
  srcAvatar: string;
  userName: string;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
  dropDownButton: Button;
};

class ChatHeader extends Block<TChatHeader> {
  constructor(props: TChatHeader) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(chatHeader, this.props);
  }
}

export { ChatHeader, TChatHeader };
