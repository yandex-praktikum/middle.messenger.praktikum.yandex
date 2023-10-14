import HTTPTransport from '../core/HTTPTransport';
import {
    APIError,
    ChatDTO,
    CreateChat,
    DataAddingUsersToChat,
    DataToken,
    DeleteChat,
    DeleteChatData,
    UserDTCO,
} from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat): Promise<void | APIError> {
        return chatApi.post<void>('/', { data });
    }

    async getChats(): Promise<ChatDTO[] | APIError > {
        return chatApi.get<ChatDTO[]>('');
    }

    async getChatUsers(id: number): Promise<UserDTCO[] | APIError > {
        return chatApi.get<UserDTCO[]>(`/${id}/users`);
    }

    async deleteChat(data: DeleteChatData): Promise<DeleteChat | APIError > {
        return chatApi.delete<DeleteChat>('/', { data });
    }

    async addUserToChat(data: DataAddingUsersToChat): Promise<void | APIError> {
        return chatApi.put<void>('/users', { data });
    }

    async deleteUserToChat(data: DataAddingUsersToChat): Promise<void | APIError> {
        return chatApi.delete<void>('/users', { data });
    }

    async getUserToken(chatId: number): Promise<DataToken | APIError> {
        return chatApi.post<DataToken>(`/token/${chatId}`);
    }
}
