import './chat-header.sass';
import chatHeaderTmpl from './chat-header.hbs?raw';
import Block, { Props } from '../../core/Block';

export class ChatHeader extends Block {
    constructor(props: Props) {
        super({
            ...props,
            title: () => {
                const { chats } = window.store.getState();
                const currentChat = chats.find((chat) => (chat.id === props?.currentChat));
                if (currentChat) {
                    return currentChat.title;
                }
                return '';
            },
            onShowDialogChatMenu: () => {
                const { isOpenDialogChatMenu } = window.store.getState();
                if (!isOpenDialogChatMenu) {
                    window.store.set({ isOpenDialogChatMenu: true });
                }
            },
        });
    }

    protected render(): string {
        return chatHeaderTmpl;
    }
}
