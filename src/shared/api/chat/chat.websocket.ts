import { WSClient } from "..";
import { WSTransportEvents } from "../WSClient";
import { Message } from "./chat.types";

class ChatWebsocket extends WSClient {
  constructor(url: string) {
    super(url);
    this.register(WSTransportEvents.Message, this.handleWSMessages.bind(this));
  }

  public getMessages(offset: string): void {
    this.send({ type: "get old", content: offset });
  }

  public sendMessage(message: string): void {
    this.send({ type: "message", content: message });
  }

  private handleWSMessages(data: any) {
    switch (data.type) {
      case undefined:
        this.storeMessages(data.reverse());
        break;

      case "message":
        this.getMessages("0");
        break;

      default:
        break;
    }
  }

  private storeMessages(messages: Message[]): void {
    window.store.set({ messages });
  }
}

export { ChatWebsocket };
