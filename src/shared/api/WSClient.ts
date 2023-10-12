import { EventBus } from "../model";

type WSSendData = string | number | object;

enum WSTransportEvents {
  Error = "error",
  Connected = "connected",
  Close = "close",
  Message = "message",
}

class WSClient extends EventBus {
  private socket?: WebSocket;
  private pingInterval?: ReturnType<typeof setInterval>;
  private readonly pingIntervalTime = 30000;
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: WSSendData) {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error("Socket is already connected");
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.register(WSTransportEvents.Error, reject);
      this.register(WSTransportEvents.Connected, () => {
        this.unregister(WSTransportEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, this.pingIntervalTime);

    this.register(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.dispatch(WSTransportEvents.Connected);
    });

    socket.addEventListener("close", () => {
      this.dispatch(WSTransportEvents.Close);
    });

    socket.addEventListener("error", (error: Event) => {
      this.dispatch(WSTransportEvents.Error, error);
    });

    socket.addEventListener("message", (message: MessageEvent<any>) => {
      try {
        const data = JSON.parse(message.data);
        if (["pong", "user connected"].includes(data?.type)) {
          return;
        }
        this.dispatch(WSTransportEvents.Message, data);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

export { WSClient, WSTransportEvents };
