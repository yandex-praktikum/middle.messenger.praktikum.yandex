import './chat.sass';
import chatTmpl from './chat.hbs?raw';
import Block from '../../core/Block';

export class Chat extends Block {
    protected render(): string {
        return chatTmpl;
    }
}
