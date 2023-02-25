import HTTPTransport, { TOptionsData } from '../classes/HTTPTransport';
import BaseAPI from './BaseApi';

class AuthApi extends BaseAPI {
    public http = new HTTPTransport(`${this.baseUrl}/auth`);

    public createUser(data: TOptionsData): Promise<any> {
        return this.http.post('/signup', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public login(data: TOptionsData): Promise<any> {
        return this.http.post('/signin', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(): Promise<any> {
        return this.http.get('/user');
    }

    public logout(): Promise<any> {
        return this.http.post('/logout');
    }
}


export default new AuthApi();
