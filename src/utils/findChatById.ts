import Store from "../core/Store";
import Socket from "../core/Socket";

const findChatById = (chatId: string | undefined): Socket | undefined => {
    let chatSocket;
    const storeState = Store.getState().sockets;

    Object.entries(storeState).forEach(([key, value]) => {
        if (key === chatId) {
            chatSocket = value;
        }
    });

    return chatSocket;
};

export default findChatById;
