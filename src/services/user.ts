import UserApi from '../api/user';
import {
    ChangePassword, ChangeUser, Login, UserDTO,
} from '../api/type';
import { apiHasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';
import { CUser } from '../type';

const userApi = new UserApi();

const changeProfile = async (data: ChangeUser) => {
    const responseUser = await userApi.changeProfile(data);
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason);
    }

    window.store.set({ user: transformUser(responseUser as UserDTO) });
};

const changePassword = async (data: ChangePassword) => {
    const responseUser = await userApi.changeUserPassword(data);
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason);
    }
};

const changeUserAvatar = async (file: File) => {
    const data = new FormData();
    data.append('avatar', file);

    const responseUser = await userApi.changeUserAvatar(data);
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason);
    }

    window.store.set({ user: transformUser(responseUser as UserDTO) });
};

const searchUsers = async (data: Login) => {
    const responseUsers = await userApi.searchUsers(data);
    if (apiHasError(responseUsers)) {
        throw Error(responseUsers.reason);
    }

    window.store.set({ searchChatUsers: responseUsers.map((user) => transformUser(user)) });
};

const getUserById = (id: number): CUser => {
    const { currentChatUsers } = window.store.getState();
    const findUser = currentChatUsers.find((user) => user.id === id);
    return {
        id: findUser?.id || 0,
        login: findUser?.login || '',
        firstName: findUser?.firstName || '',
        secondName: findUser?.secondName || '',
        displayName: findUser?.displayName || '',
        avatar: findUser?.avatar || '',
        role: findUser?.role || '',
    };
};

const itMe = (id: number) => {
    const userById = getUserById(id);
    const { user } = window.store.getState();
    if (userById && user) {
        return userById.id === user.id;
    }
    return undefined;
};

const getAvatar = (id: number) => {
    const userById = getUserById(id);
    return userById?.avatar;
};

export {
    changeProfile,
    changeUserAvatar,
    changePassword,
    searchUsers,
    getUserById,
    itMe,
    getAvatar,
};
