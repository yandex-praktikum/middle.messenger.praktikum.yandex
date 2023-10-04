import { HTTPClient } from "@/shared/api";
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
}

export { ChatAPI };
