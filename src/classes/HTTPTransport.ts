const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export type TOptionsData = Record<string, string | number | Array<string | number>>;
type TOptions = {
    headers?: Record<string, string>,
    // eslint-disable-next-line no-undef
    data?: TOptionsData | FormData,
    method?: string,
    timeout?: number
}
type HTTPMethod = (url: string, options?: TOptions) => Promise<any>
type HTTPRequest = (url: string, options?: TOptions, timeout?: number) => Promise<unknown | void>

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
// eslint-disable-next-line no-undef
function queryStringify(data: TOptionsData | FormData): string {
    // eslint-disable-next-line no-undef
    if (data instanceof FormData) return '';
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
    baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public get: HTTPMethod = (url = '', options = {}) => this.request(this.baseUrl + url, { ...options, method: METHODS.GET });

    public post: HTTPMethod = (url = '', options = {}) => this.request(this.baseUrl + url, { ...options, method: METHODS.POST });

    public put: HTTPMethod = (url = '', options = {}) => this.request(this.baseUrl + url, { ...options, method: METHODS.PUT });

    public delete: HTTPMethod = (url = '', options = {}) => this.request(this.baseUrl + url, { ...options, method: METHODS.DELETE });

    // eslint-disable-next-line class-methods-use-this
    public request: HTTPRequest = (url = '', options = {}): any => {
        const {
            headers = {}, method, data, timeout = 5000,
        } = options;

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
            xhr.withCredentials = true;
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
                // eslint-disable-next-line no-undef
                const sendData = data instanceof FormData ? data : JSON.stringify(data);
                xhr.send(sendData);
            }
        });
    };
}
