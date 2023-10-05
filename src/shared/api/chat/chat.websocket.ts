import { WSClient } from "..";

class ChatWebsocket extends WSClient {
  constructor(url: string) {
    super(url);
  }
}

export { ChatWebsocket };
