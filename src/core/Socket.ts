import Services from "./Services";

const WSS_URL = "wss://ya-praktikum.tech/ws/chats";

class Socket {
    socket: WebSocket;
    protected token: string;
    protected chatId: string;
    protected userId: string;

    static instance: Socket;

    constructor(userId: string, chatId: string, token: string) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;

        this.socket = new WebSocket(`${WSS_URL}/${this.userId}/${this.chatId}/${this.token}`);
        this._init();
    };

    private _init() {
        this.socket.addEventListener("open", this._open.bind(this));
        this.socket.addEventListener("message", this.message.bind(this));
    };

    send(data: any): void {
        this.socket.send(JSON.stringify(data));
    };

    private _open(): void {
        this._pingPong();
    };

    message(event: MessageEvent) {
        Services.onMessage(event)
    };

    private _pingPong() {
        setInterval(() => {
            this.send({ type: "ping" })
        }, 20000);
    };
};

export default Socket;
