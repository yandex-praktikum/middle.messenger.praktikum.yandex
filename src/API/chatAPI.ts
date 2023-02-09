import HTTPTransport from "../core/HTTPTransport";

const Instance = new HTTPTransport("/chats");

export type ChatData = {
    title: string,
};

export type DeleteChatData = {
    chatId: number,
};

export type UsersData = {
    users: string[],
    chatId: number,
};

class ChatAPI {
    getAllChats() {
        return Instance.get("/");
    };

    createNewChat(data: ChatData) {
        return Instance.post("/", data);
    };

    deleteChatById(data: DeleteChatData) {
        return Instance.delete("/", data);
    };

    addUsers(data: UsersData) {
        return Instance.put("/users", data);
    };

    deleteUsers(data: UsersData) {
        return Instance.delete("/users", data);
    };

    getRequestToken(id: number) {
        return Instance.post(`/token/${id}`);
    };

    getNewMessagesCount(id: number) {
        return Instance.post(`/new/${id}`);
    };

    getChatUsers(id: number) {
        return Instance.get(`/${id}/users`);
    };

    changeChatAvatar(data: FormData) {
        return Instance.put(`/avatar`, data);
    };
};

export default new ChatAPI();
