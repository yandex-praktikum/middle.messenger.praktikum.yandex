import AuthApi from '../api/auth';
import { CreateUser, LoginRequestData, UserDTO } from '../api/type';
import { apiHasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';
import { goToChat, goToLogin } from './routes';
import { getChats } from './chat';

const authApi = new AuthApi();

const getUser = async () => {
    const responseUser = await authApi.me();
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason);
    }

    return transformUser(responseUser as UserDTO);
};

const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data);
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const me = await getUser();
    const chats = await getChats();
    window.store.set({ user: me, chats });
    goToChat();
};

const signup = async (data: CreateUser) => {
    const response = await authApi.create(data);
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const me = await getUser();
    const chats = await getChats();
    window.store.set({ user: me, chats });
    goToChat();
};

const logout = async () => {
    await authApi.logout();
    window.store.set({ user: null, currentChat: null });
    goToLogin();
};

export {
    signin,
    signup,
    logout,
    getUser,
};
