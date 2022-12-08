import { LeftPanel } from './left-panel';
import { chatItems } from '../chat-item/index';

const leftPanel = new LeftPanel({
  chatItems: chatItems,
  settings: { withInternalID: true },
});

export { leftPanel };
