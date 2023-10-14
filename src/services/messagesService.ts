import { MessageProps } from '../type';
import Socket, { Message, WebSocketProps } from '../core/Socket';
import { apiHasError } from '../utils/apiHasError';
import ChatApi from '../api/chat';
import { transformToLastMessage } from '../utils/apiTransformers';
import { getUserById } from './user';

const setLastMessage = (message:MessageProps) => {
    const { chats, currentChat } = window.store.getState();
    if (chats && currentChat) {
        const chat = chats.find((c) => c.id === currentChat);
        if (chat) {
            const newChat = { ...chat };
            newChat.lastMessage = transformToLastMessage(message, getUserById(message.user_id));
            window.store.set({ chats: chats.map((c) => (c === chat ? newChat : c)) });
        }
    }
};

export class MessagesService {
    static __instance: MessagesService | undefined;

    protected socket: Socket | null = null;

    protected socketProps: WebSocketProps = {
        userId: 0,
        chatId: 0,
        token: '',
        callbackMessages: (data: MessageProps | MessageProps[]) => {
            this.addMessage(data);
        },
    };

    constructor() {
        if (MessagesService.__instance) {
            // eslint-disable-next-line no-constructor-return
            return MessagesService.__instance;
        }

        MessagesService.__instance = this;
    }

    async getUserToken(chatId: number) {
        const chatApi = new ChatApi();
        const responseToken = await chatApi.getUserToken(chatId);
        if (apiHasError(responseToken)) {
            throw Error(responseToken.reason);
        }

        return responseToken;
    }

    async connect() {
        const { user, currentChat } = window.store.getState();
        if (user && currentChat) {
            this.socketProps.userId = user.id;
            this.socketProps.chatId = currentChat;

            const { token } = await this.getUserToken(currentChat);

            this.socketProps.token = token;

            this.socket = new Socket(this.socketProps);
        }
    }

    disconnect() {
        this.socket?.closeConnect();
    }

    sendMessage(mess: Message) {
        this.socket?.send(mess);
    }

    addMessage(message: MessageProps | MessageProps[]) {
        const { currentChatMessages } = window.store.getState();
        let newChatMessages: MessageProps[] = [];
        if (Array.isArray(message)) {
            newChatMessages = [...message].reverse();
        } else {
            newChatMessages = [...currentChatMessages, message];
            setLastMessage(message);
        }
        window.store.set({ currentChatMessages: newChatMessages });
    }
}
