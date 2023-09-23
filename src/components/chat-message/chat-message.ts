import './chat-message.sass';
import chatMessageTmpl from './chat-message.hbs?raw';
import Block from '../../core/Block';

export class ChatMessage extends Block {
    protected render(): string {
        return chatMessageTmpl;
    }
}
