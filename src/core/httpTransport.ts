enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

type Options = {
    method: METHOD;
    headers?: Record<string, string>;
    data?: any;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;

const queryStringify = (data: any) => {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${
            index < keys.length - 1 ? "&" : ""
        }`;
    }, "?");
};

class httpTransport {
    get(
        url: string,
        options: OptionsWithoutMethod = {}
    ): Promise<XMLHttpRequest> {
        return this.request(
            url + queryStringify(options.data),
            { ...options, method: METHOD.GET },
            options.timeout
        );
    }

    post(url: string, options: Options): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: METHOD.POST },
            options.timeout
        );
    }

    put(url: string, options: Options): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: METHOD.PUT },
            options.timeout
        );
    }

    delete(url: string, options: Options): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: METHOD.DELETE },
            options.timeout
        );
    }

    request(
        url: string,
        options: Options = { method: METHOD.GET },
        timeout = 5000
    ): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}

export default httpTransport;
