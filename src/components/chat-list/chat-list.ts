import './chat-list.sass';
import chatListTmpl from './chat-list.hbs?raw';
import Block from '../../core/Block';

export class ChatList extends Block {
    protected render(): string {
        return chatListTmpl;
    }
}
