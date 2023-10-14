import './chat-body.sass';
import chatBodyTmpl from './chat-body.hbs?raw';
import Block, { Props } from '../../core/Block';
import { connect } from '../../utils/connect';

class ChatBody extends Block {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    afterComponentUpdate() {
        const { element } = this;
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    protected render(): string {
        return chatBodyTmpl;
    }
}

export default connect(({ currentChatMessages }) => ({
    currentChatMessages,
}))(ChatBody);
