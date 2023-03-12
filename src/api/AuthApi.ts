import HTTPTransport, { TOptionsData } from '../classes/HTTPTransport';
import { baseUrl } from '../utils/config';

type Auth = Record<string, string|number>;

class AuthApi {
    baseUrl: string = `${baseUrl}/auth`;

    public http = new HTTPTransport(this.baseUrl);

    public createUser(data: TOptionsData): Promise<Auth> {
        return this.http.post('/signup', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public login(data: TOptionsData): Promise<Auth> {
        return this.http.post('/signin', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(): Promise<Auth> {
        return this.http.get('/user');
    }

    public logout(): Promise<Auth> {
        return this.http.post('/logout');
    }
}

export default new AuthApi();
