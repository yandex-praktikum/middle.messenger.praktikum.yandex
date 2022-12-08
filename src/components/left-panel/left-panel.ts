import { Block, TProperties} from '../../utils/core/block';
import { leftPanel } from './left-panel.tmpl';
import { ChatItem } from '../chat-item/chat-item';

type TLeftPanel = {
  chatItems: Array<ChatItem>;
  events?: Record<string, (e: Event) => void>;
  settings?: TProperties;
};

class LeftPanel extends Block<TLeftPanel> {
  constructor(props: TLeftPanel) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(leftPanel, this.props);
  }
}

export { LeftPanel, TLeftPanel };
