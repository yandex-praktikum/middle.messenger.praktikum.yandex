import './chat-list.sass';
import chatListTmpl from './chat-list.hbs?raw';
import Block, { Props } from '../../core/Block';
import { createChat, setCurrentChat } from '../../services/chat';
import { connect } from '../../utils/connect';

type DialogCreateChat = Block & {
    getChatTitle: () => string,
    setError: (error: string)=>void,
};

class ChatList extends Block {
    constructor(props: Props) {
        super({
            ...props,
            openDialog: () => window.store.set({ isOpenDialogChat: true }),
            closeDialog: () => window.store.set({ isOpenDialogChat: false }),
            onSave: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();

                const chatDialog: DialogCreateChat = this.refs.createChat as DialogCreateChat;
                const chatTitle = chatDialog.getChatTitle();
                if (!chatTitle) {
                    chatDialog.setError('Название переписки не может быть пустым');
                }
                createChat(chatTitle)
                    .then(() => window.store.set({ isOpenDialogChat: false }))
                    .catch((error) => chatDialog.setError(error));
            },
            onSetCurrentChat(id: number | undefined) {
                if (id) {
                    setCurrentChat(id);
                }
            },
        });
    }

    protected render(): string {
        return chatListTmpl;
    }
}

export default connect(({
    chats, currentChat,
}) => ({ chats, currentChat }))(ChatList);
