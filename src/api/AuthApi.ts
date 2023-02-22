import HTTPTransport from '../classes/HTTPTransport';
import BaseAPI from './BaseApi';

class AuthApi extends BaseAPI {
    constructor() {
        super();
    }

    public http = new HTTPTransport(`${this.baseUrl}/auth`);

    public create(data): Promise<unknown | void> {
        return this.http.post('/signup', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public login(data): Promise<unknown | void> {
        return this.http.post('/signin', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(): Promise<unknown | void> {
        return this.http.get('/user');
    }

    public logout(): Promise<unknown | void> {
        return this.http.post('/logout');
    }
}


export default new AuthApi();
