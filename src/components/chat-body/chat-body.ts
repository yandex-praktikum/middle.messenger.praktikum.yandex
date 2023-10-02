import './chat-body.sass';
import chatBodyTmpl from './chat-body.hbs?raw';
import Block from '../../core/Block';

export class ChatBody extends Block {
    protected render(): string {
        return chatBodyTmpl;
    }
}
