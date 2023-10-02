import './chat-header.sass';
import chatHeaderTmpl from './chat-header.hbs?raw';
import Block from '../../core/Block';

export class ChatHeader extends Block {
    protected render(): string {
        return chatHeaderTmpl;
    }
}
