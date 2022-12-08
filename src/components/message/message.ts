import { Block, TProperties} from '../../utils/core/block';
import { message } from './message.tmpl';
import { Button } from '../button/button';
import { Input } from '../input/input';

type TNewMessage = {
  sendButton: Button;
  attachButton: Button;
  textArea: Input;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class NewMessage extends Block<TNewMessage> {
  constructor(props: TNewMessage) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(message, this.props);
  }
}

export { NewMessage, TNewMessage };
