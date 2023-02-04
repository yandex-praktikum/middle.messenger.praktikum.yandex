import Router from "../core/Router";
import Store from "../core/Store";

import authAPI, { RegisterData, AuthData } from "../API/authAPI";

import setServerError from "../utils/serverError";


class AuthControllers {
    registration(data: RegisterData) {
        authAPI.registration(data)
            .then(() => {
                Router.go("/chat");
            })
            .catch((err) => {
                setServerError(err);
            });
    };

    authorization(data: AuthData) {
        authAPI.authorization(data)
            .then(() => {
                Router.go("/chat");
            })
            .catch((err) => {
                if (err.text === "User already in system") {
                    Router.go("/chat");
                } else {
                    setServerError(err);
                }
            });
    };

    logout() {
        authAPI.logout()
            .then(() => {
                Router.go("/");
                localStorage.removeItem("user");
                Store.clearStore();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getUser() {
        authAPI.getUser()
            .then((res: XMLHttpRequest) => {
                Store.setState("currentUser", res.response);
                localStorage.setItem("user", JSON.stringify(res.response));
            })
            .catch((err) => {
                if (err.text === "Cookie is not valid") {
                    Router.go("/");
                } else {
                    console.log(err);
                }
            });
    };
};

export default new AuthControllers();
