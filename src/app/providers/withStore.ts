import { ChatWebsocket } from "@/shared/api";
import { Chat, Message } from "@/shared/api/chat/chat.types";
import { User } from "@/shared/api/user";
import { Store } from "@/shared/model";

type AppState = {
  user: null | User;
  chats: null | Chat[];
  currentChatId: null | string;
  chatSocket: ChatWebsocket | null;
  messages: Message[] | null;
  currentChatUsers: User[] | null;
};

const initialState: AppState = {
  user: null,
  chats: null,
  currentChatId: null,
  chatSocket: null,
  messages: null,
  currentChatUsers: null,
};

function withStore() {
  window.store = new Store<AppState>(initialState);
}

export { withStore };
export type { AppState };
