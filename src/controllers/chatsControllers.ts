import Store from "../core/Store";
import Socket from "../core/Socket";

import chatAPI, { ChatData, DeleteChatData, UsersData } from "../API/chatAPI";

import setServerError from "../utils/serverError";
import setWindowToggle from "../utils/setWindowToggle";

class ChatControllers {
    getAllChats() {
        chatAPI.getAllChats()
            .then((res: XMLHttpRequest) => {
                Store.setState("chats", res.response);

                return res.response;
            })
            .then((chats) => {
                chats.forEach((chat: any) => {
                    chatAPI.getRequestToken(chat.id)
                        .then((res: XMLHttpRequest) => {
                            const token = res.response.token;
                            const userId = Store.getState().currentUser.id;
                            const socket = new Socket(userId, chat.id, token);
                            Store.setState(`sockets.${chat.id}`, socket);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    createNewChat(data: ChatData) {
        chatAPI.createNewChat(data)
            .then(() => {
                this.getAllChats();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    deleteChatById(data: DeleteChatData) {
        chatAPI.deleteChatById(data)
            .then(() => {
                this.getAllChats();
                Store.setState("currentChat", null);
                Store.setState("messages", []);
            })
            .catch((err) => {
                if (err.text === "Action is not permitted") {
                    setServerError(err);
                } else {
                    console.log(err);
                }
            });
    };

    addUsers(data: UsersData) {
        chatAPI.addUsers(data)
            .then(() => {
                setWindowToggle("chat__addUser");
                Store.setState("userToAdd", null);
                Store.setState("usersFound", []);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    deleteUsers(data: UsersData) {
        chatAPI.deleteUsers(data)
            .then(() => {
                setWindowToggle("chat__deleteUser");
                Store.setState("userToDelete", null);
                Store.setState("currentChatUsers", []);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    public getRequestToken(id: number) {
        chatAPI.getRequestToken(id)
            .then((res: XMLHttpRequest) => {
                return res.response.token;
            })
            .catch((err) => {
                console.log(err)
            });
    };

    getChatUsers(id: number) {
        chatAPI.getChatUsers(id)
            .then((res: XMLHttpRequest) => {
                Store.setState("currentChatUsers", res.response);
                setWindowToggle("chat__deleteUser");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    changeChatAvatar(data: FormData) {
        chatAPI.changeChatAvatar(data)
            .then((res: XMLHttpRequest) => {
                const currentChat = Store.getState().currentChat;
                Store.setState("currentChat", { ...currentChat, avatar: res.response.avatar });
                this.getAllChats();
            })
            .catch((err) => {
                console.log(err)
            });
    };
};

export default new ChatControllers();
