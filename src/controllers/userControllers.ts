import Router from "../core/Router";
import Store from "../core/Store";

import userAPI, { ChangePasswordData, FindUserData } from "../API/userAPI";
import { RegisterData } from "../API/authAPI";

import authControllers from "./authControllers";

import setServerError from "../utils/serverError";
import setWindowToggle from "../utils/setWindowToggle";


class UserControllers {
    getUserProfile(userId: number) {
        userAPI.getUserProfile(userId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    findUserByLogin(data: FindUserData) {
        userAPI.findUserByLogin(data)
            .then((res: XMLHttpRequest) => {
                Store.setState("usersFound", res.response);
                setWindowToggle("chat__addUser");
            })
            .catch((err) => {
                console.log(err)
            });
    };

    changeUserProfile(data: RegisterData) {
        userAPI.changeUserProfile(data)
            .then(() => {
                authControllers.getUser();
                Router.go("/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    changeUserPassword(data: ChangePasswordData) {
        userAPI.changeUserPassword(data)
            .then(() => {
                Router.go("/profile");
            })
            .catch((err) => {
                setServerError(err);
            });
    }

    changeUserAvatar(data: FormData) {
        userAPI.changeUserAvatar(data)
            .then(() => {
                authControllers.getUser();
                Router.go("/profile");
            })
            .catch((err) => {
                setServerError(err);
            });
    };
};

export default new UserControllers();
