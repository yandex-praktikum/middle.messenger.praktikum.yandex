export { HTTPTransport as default }

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
interface IHeaders {
    [index: string]: string
}

type Options = {
    method: METHODS
    data?:  any
    timeout?: number
    headers?: IHeaders
}
type OptionWithoutMethod = Omit<Options, 'method'>

function queryStringify(data: IHeaders):string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get(url: string, options: OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout)
    }

    post(url: string, options:OptionWithoutMethod = {}): Promise<XMLHttpRequest>{
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put(url: string, options:OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete(url: string, options:OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request(url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
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
    };
}