import { NewMessage } from './message';
import { sendButton, attachButton } from '../button/index';
import { textArea } from '../input/index';
import { submit } from '../../utils/events';

const newMessage = new NewMessage({
  
  attachButton: attachButton,
  textArea: textArea,
  sendButton: sendButton,
  events: {submit: submit},
  settings: { withInternalID: true }

});

export { newMessage };
