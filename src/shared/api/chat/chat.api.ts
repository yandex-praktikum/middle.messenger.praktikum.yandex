import { ChatWebsocket, HTTPClient } from "@/shared/api";
import { Chat } from "./chat.types";

const chatAPIInstance = new HTTPClient("/chats");

class ChatAPI {
  public async getAll(): Promise<Chat[]> {
    return chatAPIInstance.get<Chat[]>("");
  }

  public async create(title: string): Promise<string> {
    return chatAPIInstance.post("", { data: { title } });
  }

  public async getToken(id: string): Promise<{ token: string }> {
    return chatAPIInstance.post("/token/".concat(id));
  }

  public async getUsers(id: string) {
    return chatAPIInstance.get(`/${id}/users`);
  }

  public async initChat(id: string) {
    const { chatSocket } = window.store.getState();
    if (chatSocket !== null) {
      chatSocket.close();
    }

    const { user } = window.store.getState();
    const { token } = await this.getToken(id);
    const wsClient = new ChatWebsocket(
      `wss://ya-praktikum.tech/ws/chats/${user?.id}/${id}/${token}`,
    );

    window.store.set({ chatSocket: wsClient });

    await wsClient.connect();
    wsClient.getMessages("0");
  }
}

export { ChatAPI };
