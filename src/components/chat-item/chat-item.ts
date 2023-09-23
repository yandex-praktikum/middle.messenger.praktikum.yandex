import './chat-item.sass';
import chatItemTmpl from './chat-item.hbs?raw';
import Block from '../../core/Block';

export class ChatItem extends Block {
    protected render(): string {
        return chatItemTmpl;
    }
}
