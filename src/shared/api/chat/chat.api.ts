import { ChatWebsocket, HTTPClient } from "@/shared/api";
import { Chat } from "./chat.types";
import { User } from "../user";

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
    const currentChatUsers = (await chatAPIInstance.get(
      `/${id}/users`,
    )) as User[];
    window.store.set({ currentChatUsers });
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

  public async addUser(chatId: string, userId: string) {
    const response = await chatAPIInstance.put("/users", {
      data: {
        users: [parseInt(userId)],
        chatId: parseInt(chatId),
      },
    });
    if (response === "OK") {
      this.getUsers(chatId);
    }
  }

  public async deleteChat(chatId: string) {
    const response: any = await chatAPIInstance.delete("", {
      data: {
        chatId: parseInt(chatId),
      },
    });

    if (response.result.id === chatId) {
      window.store.set({
        currentChatId: null,
        currentChatUsers: null,
        messages: null,
      });
      const chats = await this.getAll();
      window.store.set({ chats });
    }
  }
}

export { ChatAPI };
