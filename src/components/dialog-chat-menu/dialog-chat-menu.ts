import './dialog-chat-menu.sass';
import dialogChatMenuTmpl from './dialog-chat-menu.hbs?raw';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { deleteChat } from '../../services/chat';

interface Props {
    isOpenDialogChatMenu: boolean,
    onAddUser: () => void,
    onDeleteUser: () => void,
    onDeleteChat: () => void,
    currentChat: number,
    error: string
}

class DialogChatMenu extends Block {
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
            onDeleteChat: () => {
                deleteChat();
                window.store.set({ isOpenDialogChatMenu: false });
            },
            onAddUser: () => {
                window.store.set({
                    isOpenDialogChoiceUser: true, loginSearch: true, isOpenDialogChatMenu: false,
                });
            },
            onDeleteUser: () => {
                window.store.set({
                    isOpenDialogChoiceUser: true, loginSearch: false, isOpenDialogChatMenu: false,
                });
            },
        });
    }

    addEvensCloseMenu() {
        document.addEventListener('click', this.evensCloseMenu);
    }

    removeEvensCloseMenu() {
        document.removeEventListener('click', this.evensCloseMenu);
    }

    evensCloseMenu = (event: MouseEvent) => {
        const { target } = event as { target:HTMLButtonElement | null };
        if (target?.classList?.contains('button__chat-menu')) return;

        const { isOpenDialogChatMenu } = window.store.getState();
        if (isOpenDialogChatMenu) {
            const chatMenu = this.element;
            if (chatMenu) {
                const withinBoundaries = event.composedPath()
                    .includes(chatMenu);

                if (!withinBoundaries) {
                    this.removeEvensCloseMenu();
                    window.store.set({ isOpenDialogChatMenu: false });
                }
            }
        }
    };

    public setError(error: string) {
        this.refs.errorLine.setProps({ error });
    }

    protected render(): string {
        if (this.props.isOpenDialogChatMenu) {
            this.addEvensCloseMenu();
        }
        return dialogChatMenuTmpl;
    }
}

export default connect(({ isOpenDialogChatMenu }) => (
    { isOpenDialogChatMenu }
))(DialogChatMenu);
