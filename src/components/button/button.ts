import { Block, TProperties} from '../../utils/core/block';
import { button } from './button.tmpl';

type TButton = {
  id?: string;
  class?: string;
  type?: string;
  text?: string;
  image?: string;
  href?: string;
  nameInput?: string;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class Button extends Block<TButton> {
  constructor(props: TButton) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(button, this.props);
  }
}

export { Button, TButton };
