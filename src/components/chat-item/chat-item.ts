import './chat-item.sass';
import chatItemTmpl from './chat-item.hbs?raw';
import Block, { Props } from '../../core/Block';

export class ChatItem extends Block {
    constructor(props: Props) {
        super({
            ...props,
            select: () => (props?.id === props?.currentChat),
            events: {
                click: (e) => {
                    if (!e) return;
                    e.preventDefault();
                    if (props.onSetCurrentChat) {
                        props.onSetCurrentChat.call(this, this.props?.id);
                    }
                },
            },
        });
    }

    protected render(): string {
        return chatItemTmpl;
    }
}
