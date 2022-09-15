import '../js/index';
import {initLoginFormInput} from './modules/init-login-form-input';
import {initChatItem} from './modules/init-chat-item';
import {initModal} from './modules/init-modal';

window.addEventListener('DOMContentLoaded', () => {
  initLoginFormInput();
  initChatItem();
  initModal();
});


