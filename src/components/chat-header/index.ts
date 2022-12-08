import { dropDownButton } from '../button/index';
import { ChatHeader } from './chat-header';

const chatHeader = new ChatHeader({
  srcAvatar: '../../../static/images/avatar.png',
  userName: 'Вадим',
  dropDownButton: dropDownButton,
  settings: { withInternalID: true },
});

export { chatHeader };
