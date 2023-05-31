import HTTPTransport, { TOptionsData } from '../classes/HTTPTransport';
import { baseUrl } from '../utils/config';

type Users = Record<string, string|number>;

class UsersApi {
    baseUrl: string = `${baseUrl}/user`;

    public http = new HTTPTransport(this.baseUrl);

    public changeData(data: TOptionsData): Promise<Users> {
        return this.http.put('/profile', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    // eslint-disable-next-line no-undef
    public changeAvatar(data: FormData): Promise<Users> {
        return this.http.put('/profile/avatar', {
            data,
        });
    }

    public changePassword(data: TOptionsData): Promise<Users> {
        return this.http.put('/password', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(id: number): Promise<Users> {
        return this.http.get(`/user/${id}`);
    }

    public searchUser(login: string): Promise<Users> {
        return this.http.post('/search', {
            data: { login },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
export default new UsersApi();
