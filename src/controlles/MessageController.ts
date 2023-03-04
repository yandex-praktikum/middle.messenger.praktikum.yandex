import { wssBaseUrl } from '../utils/config';
import EventBus from '../classes/EventBus';
import Store from '../classes/Store';
import dialogActive from '../components/dialog/dialogActive';
import { activeDialog } from '../pages/chat/chat';

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
    public events: Record<string, Function> | {} = {};

    public baseUrl: string = wssBaseUrl;

    public socket: WebSocket | null = null;


    constructor() {
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMassage = this._handleMassage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    public connect(options: wssConnectOptions) {
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        const url = `${this.baseUrl}/${this._userId}/${this._chatId}/${this._token}`;
        try {
            this.socket = new WebSocket(url);
            this._addEvents();
        } catch (e) {
            console.log(e);
        }
    }

    private _reconnect() {
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token,
        });
    }

    public disconnect() {
        if (!this.socket) return;
        
        
        clearInterval(this._ping);
        this._ping = undefined;
        this._offset = 0;
        this._removeEvents();
        this.socket?.close();
        this.socket = null;
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

    private _handleOpen(e) {
        Store.set('currentChat.messages', []);
        this.getMessage(0);
        this._ping = setInterval(() => {
            this.socket?.send(JSON.stringify({
                // content: 'НовоеНовоеНовоеНовоеНовоеНовое',
                // type: 'message',
            }));
        }, 5000);
        // let i = 58;
        // setInterval(() => {
        //     this.socket?.send(JSON.stringify({
        //         content: 'Сообщение ' + i,
        //         type: 'message',
        //     }));
        //     i++;
        // }, 2000);
        // let i = 100;
        // this._ping = setInterval(async () => {
        // i += 20;
        // await this.getMessage(i);
        // console.log('end');
        // }, 1000);
        // setTimeout(() => {
        //     this.sendMessage('Самое последнее сообщение');
        // }, 5000);
        // setTimeout(() => {
        //     this.sendMessage('2Самое последнее сообщение');
        // }, 7000);
    }

    private _handleMassage(e) {
        const data = JSON.parse(e.data);
        
        if (Array.isArray(data) && data.length) {
            if (data[0].id === 1) {
                Store.set('currentChat.messages', data);
                activeDialog.scrollBottom();
            } else {
                Store.set('currentChat.messages', [...Store.getState().currentChat.messages, ...data]);
            }

        } else if (typeof data === 'object' && data?.type === 'message') {
            Store.set('currentChat.messages', [data, ...Store.getState().currentChat.messages,]);
            activeDialog.scrollBottom();
            this._offset += 1;
        };
    }

    private _handleError(e) {
        console.log('Ошибка', e.message);
        this.disconnect();
    }

    public getMessage(offset: number | string): void {
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


    private close() { }

    private send() { }
}


export default new MessageController();
