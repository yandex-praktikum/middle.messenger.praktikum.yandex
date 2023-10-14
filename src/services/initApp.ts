import { start, goToLogin } from './routes';
import { getUser } from './auth';

import { getChats } from './chat';

const initApp = async () => {
    let me = null;
    try {
        me = await getUser();
    } catch (error) {
        goToLogin();
        return;
    }

    const chats = await getChats();
    window.store.set({ user: me, chats });
    start();
};

const initChatPage = async () => {
    const chats = await getChats();
    window.store.set({ chats });
};

export {
    initApp,
    initChatPage,
};
