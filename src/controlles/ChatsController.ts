import ChatsApi from '../api/ChatsApi';
import UsersApi from '../api/UsersApi';
import { TOptionsData } from '../classes/HTTPTransport';
import Store from '../classes/Store';
import { searchObjInArray } from '../utils/object_utils';
import BaseController from './BaseController';
import MessageController from './MessageController';

class ChatsController extends BaseController {
    public async getChats() {
        try {
            const { status, response } = await ChatsApi.getChats();
            if (status === 200) {
                this.store.set('chats', JSON.parse(response));
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async createChat(title) {
        if (!title) return false;
        try {
            const { status, response } = await ChatsApi.createChat(title);
            if (status === 200) {
                const chatId = JSON.parse(response)?.id;
                await this.getChats();
                MessageController.changeCurrentChat(chatId);
                return chatId;
            } else if (status === 500) {
                this.router.go('/500');
                return false;
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async deleteChats() {
        try {
            const chatId = this?.store?.getState()?.currentChat?.chat?.id;
            const { status, response } = await ChatsApi.deleteChat({ chatId });
            if (status === 200) {
                this.getChats();
                this.store.set('currentChat', {
                    isLoading: false,
                    isLoadingOldMsg: false,
                    scroll: 0,
                    chat: null,
                    messages: null,
                });
            } else if (status === 500) {
                this.router.go('/500');
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async addUser(id: number | string, user: number | string) {
        if (!id || !user) return false;
        try {
            const { status, response } = await ChatsApi.addUsers(id, [user]);
            if (status === 200) {
                return true;
            } else if (status === 500) {
                this.router.go('/500');
                return false;
            } else {
                alert(JSON.parse(response).reason ?? 'Ошибочный запрос');
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async addNewChatUser({ display_name, login, id }) {
        let chat = this?.store?.getState()?.currentChat?.chat?.id;
        if (!chat) {
            const title = display_name ?? login;
            chat = await this.createChat(title);
        }
        if (!chat) return;
        console.log(chat);

        const result = await this.addUser(chat, id);
        return result;
    }

}

export default new ChatsController();
