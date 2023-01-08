import WSTransport, { WSTransportEvents } from '../utils/web-socket-transport';
import { IMessage } from '../utils/interfaces';
import store from '../utils/store';
import ChatsController from './chat-controller';

export class MessagesController {

  private sockets: Map<number, WSTransport> = new Map();

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState().user.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this.sockets.set(chatId, transport);

    await transport.connect();

    this.subscribe(transport, chatId);
    this.fetchOldMessages(chatId);
  }

  async sendMessage(chatId: number, message: string) {
    const transport = this.sockets.get(chatId);

    if (!transport) {
      throw new Error(`Chat ${chatId} is not connected`);
    }

    transport!.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(chatId: number) {
    const transport = this.sockets.get(chatId);

    if (!transport) {
      throw new Error(`Chat ${chatId} is not connected`);
    }

    transport.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Object.values(this.sockets).forEach((transport) => transport.close());
  }

  private onMessage(chatId: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[chatId] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${chatId}`, messagesToAdd);
    ChatsController.fetchChats();
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  private subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSTransportEvents.Message, (message) =>
      this.onMessage(chatId, message)
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(chatId));
  }
}

export default new MessagesController();
