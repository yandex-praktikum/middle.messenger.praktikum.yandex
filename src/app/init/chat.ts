import { ChatAPI } from "@/shared/api";

async function initChats() {
  const chatAPI = new ChatAPI();
  const chats = await chatAPI.getAll();
  window.store.set({ chats: chats });
}

export { initChats };
