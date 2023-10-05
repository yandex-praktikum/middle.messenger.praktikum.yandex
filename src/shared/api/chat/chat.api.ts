import { HTTPClient, WSClient } from "@/shared/api";
import { Chat } from "./chat.types";

const chatAPIInstance = new HTTPClient(
  "https://ya-praktikum.tech/api/v2/chats",
);

class ChatAPI {
  public async getAll(): Promise<Chat[]> {
    return chatAPIInstance.get<Chat[]>("");
  }

  public async create(title: string): Promise<string> {
    return chatAPIInstance.post("", { data: { title } });
  }

  public async getToken(id: string) {
    return chatAPIInstance.post("/token/".concat(id));
  }

  public async initChat(id: string) {
    const { chatSocket } = window.store.getState();
    if (chatSocket !== null) {
      chatSocket.close();
    }

    const { user } = window.store.getState();
    const { token } = await this.getToken(id);
    const wsClient = new WSClient(
      `wss://ya-praktikum.tech/ws/chats/${user?.id}/${id}/${token}`,
    );

    window.store.set({ chatSocket: wsClient });

    await wsClient.connect();
  }
}

export { ChatAPI };
