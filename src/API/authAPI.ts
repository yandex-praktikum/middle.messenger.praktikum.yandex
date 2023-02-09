import HTTPTransport from "../core/HTTPTransport";

const Instance = new HTTPTransport("/auth");

export type RegisterData = {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
};

export type AuthData = {
    login: string,
    password: string,
};

class AuthAPI {
    registration(data: RegisterData) {
        return Instance.post("/signup", data);
    };

    authorization(data: AuthData) {
        return Instance.post("/signin", data);
    };

    logout() {
        return Instance.post("/logout");
    };

    getUser() {
        return Instance.get("/user");
    };
};

export default new AuthAPI();
