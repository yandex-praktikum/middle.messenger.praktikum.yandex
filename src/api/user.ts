import HTTPTransport from '../core/HTTPTransport';
import {
    APIError, ChangePassword, ChangeUser, Login, UserDTO,
} from './type';

const userApi = new HTTPTransport('/user');

export default class UserApi {
    async changeProfile(data: ChangeUser): Promise<ChangeUser | APIError> {
        return userApi.put<ChangeUser>('/profile', { data });
    }

    async changeUserAvatar(data: FormData): Promise<UserDTO | APIError> {
        return userApi.put<UserDTO>('/profile/avatar', { data });
    }

    async changeUserPassword(data: ChangePassword): Promise<void | APIError> {
        return userApi.put<void>('/password', { data });
    }

    async searchUsers(data: Login): Promise<UserDTO[] | APIError> {
        return userApi.post<UserDTO[]>('/search', { data });
    }
}
