import { EventBus } from './EventBus.ts';

/**
 * WebSocker EventBus
 */
export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval = 0;

  private timer: ReturnType<typeof setInterval> = setInterval(() => ({}));

  /**
   * Creates a new instance of the WSTransport class.
   * @param url API url
   */

  constructor(private url: string) {
    super();
  }

  public send(data: unknown, timeout = 500) {
    if (!this.socket) throw new Error('Socket is not connected');

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else if (this.socket.readyState === WebSocket.CONNECTING) {
      setTimeout(() => {
        this.send(data, timeout); // Retry after the specified timeout
      }, timeout);
    } else {
      // Handle the case when the WebSocket fails to open within the timeout period
      // console.error(
      //   'WebSocket connection failed to open within the timeout period'
      // );
    }
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    // add listeners
    this.subscribe(this.socket);
    this.setupPing();
    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = 5000;
    this.timer = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingInterval);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.timer);
      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () =>
      this.emit(WSTransportEvents.Connected)
    );
    socket.addEventListener('close', () => this.emit(WSTransportEvents.Close));
    socket.addEventListener('error', (e) =>
      this.emit(WSTransportEvents.Error, e)
    );
    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (data instanceof SyntaxError) {
        alert("Couldn't send message");
      }

      if (data.type && data.type === 'pong') return;
      // emit method of EventBus
      this.emit(WSTransportEvents.Message, data);
    });
  }
}
