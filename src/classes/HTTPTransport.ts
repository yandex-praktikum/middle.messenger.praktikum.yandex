const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type TOptionsData = Record<string, string | number>
type TOptions = {
    headers?: Record<string, string>,
    data?: TOptionsData,
    method?: string,
    timeout?: number
}
type HTTPMethod = (url: string, options?: TOptions) => Promise<unknown>
type HTTPRequest = (url: string, options?: TOptions, timeout?: number) => Promise<unknown | void>

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: TOptionsData): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
    static get: HTTPMethod = (url = '', options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    static post: HTTPMethod = (url = '', options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    static put: HTTPMethod = (url = '', options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    static delete: HTTPMethod = (url = '', options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    static request: HTTPRequest = (url = '', options = {}, timeout = 5000): Promise<unknown | void> => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('No method');
                return;
            }

            // eslint-disable-next-line no-undef
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            // eslint-disable-next-line func-names
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
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
