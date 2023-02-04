import Store from "../core/Store";

const setServerError = (err: Record<string, unknown>) => {
    Store.setState("server-error", err.text);

    setTimeout(() => {
        Store.setState("server-error", null);
    }, 5000);
};

export default setServerError;
