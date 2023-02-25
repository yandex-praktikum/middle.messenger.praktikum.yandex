import ChatsApi from '../api/ChatsApi';
import UsersApi from '../api/UsersApi';
import { TOptionsData } from '../classes/HTTPTransport';
import BaseController from './BaseController';

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

    public async getToken() {
        try {
            const { status, response } = await ChatsApi.getToken(5131);
            if (status === 200) {
                return response;
                // this.store.set('chats', JSON.parse(response));
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
                return JSON.parse(response).id;
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
        const title = display_name ?? login;
        const newChat = await this.createChat(title);
        if (!newChat) return;
        const result = await this.addUser(newChat, id);
        this.getChats();
        return result;
    }
}

export default new ChatsController();
