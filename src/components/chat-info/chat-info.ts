import './chat-info.sass';
import chatInfoTmpl from './chat-info.hbs?raw';
import Block from '../../core/Block';

export class ChatInfo extends Block {
    protected render(): string {
        return chatInfoTmpl;
    }
}
