import HTTPTransport, { TOptionsData } from '../classes/HTTPTransport';
import { baseUrl } from '../utils/config';

type Chats = Record<string, string|number>;

class ChatsApi {
    baseUrl: string = `${baseUrl}/chats`;

    public http = new HTTPTransport(this.baseUrl);

    public getChats(): Promise<Chats> {
        return this.http.get('/');
    }

    public getToken(id: number): Promise<Chats> {
        return this.http.post(`/token/${id}`);
    }

    public createChat(title: string): Promise<Chats> {
        return this.http.post('/', {
            data: { title },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public addUsers(chatId: number, users: Array<number>): Promise<Chats> {
        return this.http.put('/users', {
            data: { chatId, users },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteChat(data: TOptionsData): Promise<Chats> {
        return this.http.delete('/', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteUsers(data: TOptionsData): Promise<Chats> {
        return this.http.delete('/users', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
export default new ChatsApi();
