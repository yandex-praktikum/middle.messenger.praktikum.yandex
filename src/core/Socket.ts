export type WebSocketProps = {
    userId: number;
    chatId: number;
    token: string;
    callbackMessages: (data: any) => void;
};

export type Message = {
    content: unknown;
    type: string;
};

enum STATE {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}

class Socket {
    private socket: WebSocket;

    protected _baseUrl: string;

    protected _chatsUrl: string;

    protected timeoutId: number = 0;

    protected callbackMessages: (data: any) => void;

    chatId: number;

    constructor({
        userId, chatId, token, callbackMessages,
    }: WebSocketProps) {
        this._baseUrl = 'wss://ya-praktikum.tech/ws';
        this._chatsUrl = `${this._baseUrl}/chats`;
        this.chatId = chatId;
        this.callbackMessages = callbackMessages;
        this.socket = new WebSocket(
            `${this._chatsUrl}/${userId}/${chatId}/${token}`,
        );

        this.socket.onerror = this.error;
        this.socket.onclose = this.close.bind(this);
        this.socket.onmessage = this.message.bind(this);
        this.socket.onopen = this.open.bind(this);

        this.timeoutId = 0;
    }

    public send(message: Message) {
        this.socket.send(JSON.stringify(message));
    }

    public open(event: Event) {
        console.log('The connection is established', event);
        this.sendPing();
        this.socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            }),
        );
    }

    public close(event: CloseEvent) {
        if (event.wasClean) {
            console.log('Connection closed cleanly');
        } else {
            console.log('Connection failure');
        }

        console.log(`Code: ${event.code} | Reason: ${event.reason}`);
    }

    public message(event: MessageEvent) {
        const data = JSON.parse(event.data);

        if (data.type !== 'user connected' && data.type !== 'pong') {
            this.callbackMessages(data);
        }
    }

    public error(event: Event) {
        console.log('Error', event);
    }

    public closeConnect() {
        this.socket?.close(1000, 'The work is done');
    }

    protected sendPing() {
        if (this.socket?.readyState === STATE.OPEN) {
            this.send({ content: 'ping', type: 'ping' });
            this.timeoutId = setTimeout(this.sendPing.bind(this), 20000);
        }
    }
}

export default Socket;
