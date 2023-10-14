import './chat.sass';
import chatTmpl from './chat.hbs?raw';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';

class Chat extends Block {
    protected render(): string {
        return chatTmpl;
    }
}

export default connect((
    { currentChat },
) => (
    { currentChat }
))(Chat);
