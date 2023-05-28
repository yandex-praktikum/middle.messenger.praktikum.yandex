import HTTPTransport, { TOptionsData } from '../classes/HTTPTransport';
import BaseAPI from './BaseApi';

class UsersApi extends BaseAPI {
    public http = new HTTPTransport(`${this.baseUrl}/user`);

    public changeData(data: TOptionsData): Promise<any> {
        return this.http.put('/profile', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    // eslint-disable-next-line no-undef
    public changeAvatar(data: FormData): Promise<any> {
        return this.http.put('/profile/avatar', {
            data,
        });
    }

    public changePassword(data: TOptionsData): Promise<any> {
        return this.http.put('/password', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(id: number): Promise<any> {
        return this.http.get(`/user/${id}`);
    }

    public searchUser(login: string): Promise<any> {
        return this.http.post('/search', {
            data: { login },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
export default new UsersApi();
