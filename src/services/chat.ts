import ChatApi from '../api/chat';
import { apiHasError } from '../utils/apiHasError';
import { transformChats, transformChatUser } from '../utils/apiTransformers';
import { CUser } from '../type';
import { MessagesService } from './messagesService';

const chatApi = new ChatApi();
const messagesService = new MessagesService();

const getChats = async () => {
    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    return transformChats(responseChat);
};

const createChat = async (title: string) => {
    const response = await chatApi.create({ title });
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({ chats });
};

const getChatUsers = async (id: number) => {
    const responseChat = await chatApi.getChatUsers(id);
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    return transformChatUser(responseChat);
};

const setCurrentChat = async (id: number) => {
    const chatUsers = await getChatUsers(id);

    window.store.set({ currentChat: id, currentChatUsers: chatUsers });

    messagesService.disconnect();
    messagesService.connect();
};

const sendTextMessage = (message: string) => {
    const mess = {
        content: message,
        type: 'message',
    };
    messagesService?.sendMessage(mess);
};

const deleteChat = async () => {
    const { chats, currentChat } = window.store.getState();
    if (currentChat) {
        const responseChat = await chatApi.deleteChat({ chatId: currentChat });
        if (apiHasError(responseChat)) {
            throw Error(responseChat.reason);
        }

        window.store.set({
            chats: chats.filter((chat) => (chat.id !== currentChat)),
            currentChat: null,
        });
    }
};

const addUserToChat = async (data: CUser) => {
    const { currentChat, currentChatUsers } = window.store.getState();
    if (currentChat && data) {
        const responseError = await chatApi.addUserToChat({
            users: [data.id], chatId: currentChat,
        });
        if (apiHasError(responseError)) {
            throw Error(responseError.reason);
        }

        const newCurrentChatUsers = [...currentChatUsers, data];
        window.store.set({ currentChatUsers: newCurrentChatUsers });
    }
};

const deleteUserToChat = async (data: CUser) => {
    const { currentChat, currentChatUsers } = window.store.getState();
    if (currentChat && data) {
        const responseError = await chatApi.deleteUserToChat({
            users: [data.id], chatId: currentChat,
        });
        if (apiHasError(responseError)) {
            throw Error(responseError.reason);
        }

        const newCurrentChatUsers = currentChatUsers.filter((user) => user.id !== data.id);
        window.store.set({ currentChatUsers: newCurrentChatUsers });
    }
};

export {
    createChat,
    getChats,
    setCurrentChat,
    deleteChat,
    addUserToChat,
    deleteUserToChat,
    sendTextMessage,
};
