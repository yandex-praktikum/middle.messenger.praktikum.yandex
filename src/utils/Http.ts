enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type IOptionsRequest = {
    data?: string;
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    timeout?: number;
    headers?: Record<string, string>;
    params?: object;
}

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<unknown>

/**
 *  Get string of query params from object params
 * @param data
 */
function queryStringify(data: object) {
    let result = '?';
    result = result + Object.entries(data).map(([key, value]) => {
        return `${key}=${Array.isArray(value) ? value.join(',') : String(value)}`
    }).join("&")
    return result;
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, {
            ...options,
            data: queryStringify(options.params || {}) || '',
            method: METHODS.GET
        }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {

        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    post: HTTPMethod = (url, options = {}) => {

        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    delete: HTTPMethod = (url, options = {}) => {

        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: IOptionsRequest = {method: METHODS.GET}, timeout = 5000) => {
        const {method, headers, data} = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            const isGet = method === METHODS.GET;
            xhr.open(method || METHODS.GET, isGet ? `${url}${data}` : url,);


            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }


            xhr.onload = function () {
                resolve(xhr);
            };

            /*        const handleError = err => {
                        reject(err);
                    };*/

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

export default HTTPTransport;
