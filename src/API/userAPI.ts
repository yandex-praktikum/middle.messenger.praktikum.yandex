import HTTPTransport from "../core/HTTPTransport";

import { RegisterData } from "./authAPI";

const Instance = new HTTPTransport("/user");

export type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};

export type FindUserData = {
    login: string;
};

class UserAPI {
    getUserProfile(userId: number) {
        return Instance.get(`/${userId}`);
    };

    findUserByLogin(data: FindUserData) {
        return Instance.post("/search", data);
    };

    changeUserProfile(data: RegisterData) {
        return Instance.put("/profile", data);
    };

    changeUserPassword(data: ChangePasswordData) {
        return Instance.put("/password", data);
    }

    changeUserAvatar(data: FormData) {
        return Instance.put("/profile/avatar", data);
    };
};

export default new UserAPI();
