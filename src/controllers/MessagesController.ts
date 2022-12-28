import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import { IMessage } from '../utils/Interfaces';
import store from '../utils/Store';
import ChatsController from './ChatsController';

export class MessagesController {

  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    );

    this.sockets.set(id, transport);

    await transport.connect();

    this.subscribe(transport, id);
    this.fetchOldMessages(id);
  }

  async sendMessage(id: number, message: string) {
    const transport = this.sockets.get(id);

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport!.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const transport = this.sockets.get(id);

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Object.values(this.sockets).forEach((transport) => transport.close());
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
    ChatsController.fetchChats();
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) =>
      this.onMessage(id, message)
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
