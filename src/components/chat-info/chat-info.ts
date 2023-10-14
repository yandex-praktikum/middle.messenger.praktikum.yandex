import './chat-info.sass';
import chatInfoTmpl from './chat-info.hbs?raw';
import Block, { Props } from '../../core/Block';
import { connect } from '../../utils/connect';

export class ChatInfo extends Block {
    constructor(props: Props) {
        super({
            ...props,
            avatars: () => props?.currentChatUsers?.filter((_:unknown, i:number) => (i < 3)),
        });
        this.props.numberOfParticipants = () => this.props?.currentChatUsers?.length || 0;
        this.props.getAvatars = () => this.props?.currentChatUsers?.filter(
            (_:unknown, i:number) => (i < 3),
        );
    }

    protected render(): string {
        return chatInfoTmpl;
    }
}

export default connect((
    { currentChatUsers },
) => (
    { currentChatUsers }
))(ChatInfo);
