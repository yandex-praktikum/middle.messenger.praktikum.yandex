import './dialog-create-chat.sass';
import dialogCreateChatTmpl from './dialog-create-chat.hbs?raw';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { InputField } from '../input-field/input-field';

interface Props {
    isOpenDialogChat: boolean,
    onSave: () => void,
    onClose: () => void,
    error: string
}

class DialogCreateChat extends Block {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    public getChatTitle() {
        const chatTitle = this.refs.chatTitle as InputField;
        return chatTitle.value();
    }

    public setError(error: string) {
        this.refs.errorLine.setProps({ error });
    }

    protected render(): string {
        return dialogCreateChatTmpl;
    }
}

export default connect((state) => ({ isOpenDialogChat: state.isOpenDialogChat }))(DialogCreateChat);
