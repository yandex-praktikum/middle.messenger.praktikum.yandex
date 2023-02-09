enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
};

type Options = {
    method?: METHOD;
    headers?: Record<string, string>;
    data?: any;
    timeout?: number;
};

type HTTPMethod = (url: string, data?: any, headers?: Record<string, string>) => Promise<XMLHttpRequest>

const queryStringify = (data: any) => {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    };

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""
            }`;
    }, "?");
};

class HTTPTransport {
    url: string;

    constructor(type: string) {
        this.url = `https://ya-praktikum.tech/api/v2${type}`;
    };

    get: HTTPMethod = (url, data, headers) => {
        return this.request(this.url + url, { method: METHOD.GET, data, headers });
    };

    post: HTTPMethod = (url, data, headers) => {
        return this.request(this.url + url, { method: METHOD.POST, data, headers });
    };

    put: HTTPMethod = (url, data, headers) => {
        return this.request(this.url + url, { method: METHOD.PUT, data, headers });
    };

    delete: HTTPMethod = (url, data, headers) => {
        return this.request(this.url + url, { method: METHOD.DELETE, data, headers });
    };

    request(url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> {
        const { headers = {}, method, data = {} } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.setRequestHeader("Accept", "application/json");
            xhr.withCredentials = true;
            xhr.responseType = "json";

            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log("ALL OK!");
                    resolve(xhr);
                } else {
                    reject({ text: xhr.response.reason, code: xhr.status });
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(data));
            }
        });
    };
};

export default HTTPTransport;
