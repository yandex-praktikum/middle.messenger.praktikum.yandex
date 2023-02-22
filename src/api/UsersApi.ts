import HTTPTransport from '../classes/HTTPTransport';
import BaseAPI from './BaseApi';

class ProfileApi extends BaseAPI {
    constructor() {
        super();
    }

    public http = new HTTPTransport(`${this.baseUrl}/user`);

    public changeData(data): Promise<unknown | void> {
        return this.http.put('/profile', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public changeAvatar(file: FormData): Promise<unknown | void> {
        return this.http.put('/profile', {
            file,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public changePassword(data): Promise<unknown | void> {
        return this.http.put('/profile', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(id: string | number): Promise<unknown | void> {
        return this.http.get(`/user/${id}`);
    }

    public searchUser(login: string): Promise<unknown | void> {
        return this.http.post('/search', {
            data: { login },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }


}


export default new ProfileApi();
