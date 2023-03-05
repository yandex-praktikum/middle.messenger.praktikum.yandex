import { wssBaseUrl } from '../utils/config';
import EventBus from '../classes/EventBus';
import Store from '../classes/Store';
import dialogActive from '../components/dialog/dialogActive';
import { activeDialog } from '../pages/chat/chat';
import ChatsController from './ChatsController';
import ChatsApi from '../api/ChatsApi';
import { searchObjInArray } from '../utils/object_utils';

export type wssConnectOptions = {
    userId: number | string,
    chatId: number | string,
    token: string,
};

class MessageController {
    public EVENTS: Record<string, string> = {
        OPEN: 'open',
        MESSAGE: 'message',
        ERROR: 'error',
        CLOSE: 'close',
    };

    private _userId: number | string;

    private _chatId: number | string;

    private _token: string;

    private _ping: number | undefined;

    private _offset: number = 0;

    private _allMessage: boolean = false;


    public events: Record<string, Function> | {} = {};

    public baseUrl: string = wssBaseUrl;

    public socket: WebSocket | null = null;


    constructor() {
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMassage = this._handleMassage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    public async getConnectData() {
        this._userId = Store?.getState()?.user?.id;
        this._chatId = Store?.getState()?.currentChat?.chat?.id;
        this._token = await this.getToken(this._chatId);
    }

    public async connect(options: wssConnectOptions) {

        await this.getConnectData();
        this._offset = 0;
        const url = `${this.baseUrl}/${this._userId}/${this._chatId}/${this._token}`;
        try {
            this.socket = new WebSocket(url);
            this._addEvents();
        } catch (e) {
            console.log(e);
        }
    }

    private _reconnect() {
        this._allMessage = false;
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token,
        });
    }

    public async disconnect() {
        if (!this.socket) return;
        clearInterval(this._ping);
        this._allMessage = false;
        this._ping = undefined;
        this._offset = 0;

        this._removeEvents();
        await this.socket?.close();
        this.socket = null;
    }

    public async changeCurrentChat(id: number | undefined): void {
        if (!id) return;
        const chat = searchObjInArray(Store.getState().chats, 'id', Number(id));
        if (chat && chat?.id !== Store?.getState()?.currentChat?.chat?.id) {
            Store.set('currentChat.isLoading', true);
            Store.set('currentChat.chat', chat);

            await this.disconnect();
            this.connect();
            return;
        }
    }


    private _addEvents() {
        this.socket.addEventListener(this.EVENTS.OPEN, this._handleOpen);
        this.socket.addEventListener(this.EVENTS.MESSAGE, this._handleMassage);
        this.socket.addEventListener(this.EVENTS.ERROR, this._handleError);
        this.socket.addEventListener(this.EVENTS.CLOSE, this._handleClose);
    }

    private _removeEvents() {
        this.socket.removeEventListener(this.EVENTS.OPEN, this._handleOpen);
        this.socket.removeEventListener(this.EVENTS.MESSAGE, this._handleMassage);
        this.socket.removeEventListener(this.EVENTS.ERROR, this._handleError);
        this.socket.removeEventListener(this.EVENTS.CLOSE, this._handleClose);
    }


    private async getToken(chatID) {
        try {
            const { status, response } = await ChatsApi.getToken(chatID);
            if (status === 200) {
                return JSON.parse(response).token;
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

    private _handleOpen(e) {
        Store.set('currentChat.messages', []);
        this.getMessage();
        this._ping = setInterval(() => {
            this.socket?.send(JSON.stringify({
                content: '',
                type: '',
            }));
        }, 20000);
    }

    private _handleMassage(e) {

        const data = JSON.parse(e.data);
        if (Array.isArray(data) && data.length < 20) {
            this._allMessage = true;
            Store.set('currentChat.isLoading', false);
            Store.set('currentChat.isLoadingOldMsg', false);
        }
        if (Array.isArray(data) && data.length) {
            if (data[0].id === 1) {
                Store.set('currentChat.messages', data);
                Store.set('currentChat.isLoading', false);
                activeDialog.scrollBottom();
            } else {
                Store.set('currentChat.messages', [...Store.getState().currentChat.messages, ...data]);
                Store.set('currentChat.isLoadingOldMsg', false);
            }
        } else if (typeof data === 'object' && data?.type === 'message') {
            Store.set('currentChat.messages', [data, ...Store.getState().currentChat.messages,]);
            activeDialog.scrollBottom();
            this._offset += 1;
        }
    }

    private _handleError(e) {
        console.log('Ошибка', e.message);
        this.disconnect();
    }

    public getMessage(): void {
        if (this._allMessage) {
            return;
        }
        if (this._offset) {
            Store.set('currentChat.isLoadingOldMsg', true);
        }
        this.socket?.send(JSON.stringify({
            content: this._offset,
            type: 'get old',
        }));
        this._offset += 20;
    }

    public sendMessage(message) {
        const content = message['messagе'];
        this.socket?.send(JSON.stringify({
            content: content,
            type: 'message',
        }));

    }

    private _handleClose(e) {
        if (e.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(`Код: ${e.code} | Причина: ${e.reason}`);

        this.disconnect();
        if (e.code === 1006) {
            this._reconnect();
        }
    }



}


export default new MessageController();
