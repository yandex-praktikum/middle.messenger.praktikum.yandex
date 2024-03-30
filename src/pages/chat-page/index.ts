import Handlebars from 'handlebars';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs?raw';

Handlebars.registerHelper('chat-page-list', () => {
  return [
    { name: 'user1', message: 'message1'},
    { name: 'user2', message:'message2' },
    { name: 'user3', message:'message3'},
  ]
});
