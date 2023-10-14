import './chat.sass';
import chatTmpl from './chat.hbs?raw';
import Block, { Props } from '../../core/Block';

export class ChatPage extends Block {
    protected constructor(props: Props = {}) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return chatTmpl;
    }
}
