import constants from '../constants';
import queryStringify from '../utils/queryStringify';

enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

interface Options {
    method: METHOD;
    data?: Record<string | symbol, any> | FormData;
    headers?: Record<string, string>;
    timeout?: number;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
    protected apiUrl: string = '';

    constructor(apiPath: string = '') {
        this.apiUrl = `${constants.HOST}${apiPath}`;
    }

    get = <TResponse>(
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<TResponse> => this.request<TResponse>(
        `${this.apiUrl}${url}`,
        { ...options, method: METHOD.GET },
        options.timeout,
    );

    post = <TResponse>(
        url: string,
        options:OptionsWithoutMethod = {},
    ): Promise<TResponse> => this.request<TResponse>(
        `${this.apiUrl}${url}`,
        { ...options, method: METHOD.POST },
        options.timeout,
    );

    put = <TResponse>(
        url: string,
        options:OptionsWithoutMethod = {},
    ): Promise<TResponse> => this.request<TResponse>(
        `${this.apiUrl}${url}`,
        { ...options, method: METHOD.PUT },
        options.timeout,
    );

    delete = <TResponse>(
        url: string,
        options:OptionsWithoutMethod = {},
    ): Promise<TResponse> => this.request<TResponse>(
        `${this.apiUrl}${url}`,
        { ...options, method: METHOD.DELETE },
        options.timeout,
    );

    request = async <TResponse>(
        url: string,
        options:Options = { method: METHOD.GET },
        timeout = 5000,
    ): Promise<TResponse> => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === METHOD.GET && data) {
                // eslint-disable-next-line no-param-reassign
                url += queryStringify(data as Record<string, any>);
            }

            xhr.open(method || METHOD.GET, url);

            if (data instanceof FormData) {
                xhr.setRequestHeader('Accept', 'application/json');
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    reject(new Error(`Ошибка ${xhr.status}: ${xhr?.response?.reason || xhr.statusText}`));
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
