import Store from "./Store";

import findChatById from "../utils/findChatById";
import setWindowToggle from "../utils/setWindowToggle";

class Services {
    onClick(event: Event): void {
        const element = event.target as HTMLElement;

        if (element.dataset.value === "chat-item") {
            const chatId = element.dataset.id;
            const chatTitle = element.dataset.title;
            const chatAvatar = element.dataset.avatar;

            Store.setState("currentChat", { id: chatId, title: chatTitle, avatar: chatAvatar });
            const socket = findChatById(chatId);

            if (socket) {
                socket.send({
                    content: "0",
                    type: "get old",
                });
            }
        } else if (element.dataset.value === "found-user") {
            const userId = element.dataset.id;
            const userLogin = element.dataset.login;

            Store.setState("userToAdd", { id: userId, login: userLogin });
            setWindowToggle("chat__addUser");
        } else if (element.dataset.value === "chat-user") {
            const userId = element.dataset.id;
            const userLogin = element.dataset.login;

            Store.setState("userToDelete", { id: userId, login: userLogin });
            setWindowToggle("chat__deleteUser");
        }
    };

    onMessage(event: MessageEvent) {
        if (event.data) {
            const data = JSON.parse(event.data)

            if (!Array.isArray(data)) {
                this._addNewMessageToChat(data);
            } else {
                this._saveChatMessages(data);
            }
        }
    };

    private _addNewMessageToChat(data: any): void {
        if (data.type !== "message") return;

        const { messages, currentUser: { id } } = Store.getState();

        const message = data;
        const time = new Date(message.time).toLocaleTimeString().slice(0, 5)
        const messageToSave = { ...message, time, my: id === message.user_id };

        messages.push(messageToSave);

        Store.setState("messages", messageToSave);
    };

    private _saveChatMessages(messages: any[]): void {
        if (messages.length > 0) {
            const { currentUser: { id } } = Store.getState();

            const messagesToSave = messages.map(message => {
                const time = new Date(message.time).toLocaleTimeString().slice(0, 5);

                return { ...message, time, my: id === message.user_id }
            }).reverse();

            Store.setState("messages", messagesToSave);
        } else {
            Store.setState("messages", []);
        }
    };

    onClose() {
        Store.setState("currentChat", null);
        Store.setState("messages", []);
    };
};

export default new Services();
