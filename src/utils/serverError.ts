import Store from "../core/Store";

const setServerError = (err: any) => {
    Store.setState("server-error", err.text);

    setTimeout(() => {
        Store.setState("server-error", null);
    }, 5000);
};

export default setServerError;
