const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface IHTTP {
  get: Function,
  post: Function,
  put: Function,
  delete: Function,
  request: Function,
}

type Options = {
  headers?: Map<string, string>,
  data?: [string, string][] | object,
  timeout?: number,
  retries?: number,
}

type MethodOnly = {
  method: string,
}

type OptionsWithMethod = Options & MethodOnly;

// type XHRInstance = {
//   status: number,
//   responseText: string,
// }

type ReturnedData = {
  status: number,
  response: any
}

type HTTPMethod = (url?: string, options?: Options) => Promise<ReturnedData>;
type HTTPMethodRequest = (url: string, options: OptionsWithMethod) => Promise<ReturnedData>;

class HTTP implements IHTTP {
  private _baseURL;

  constructor(baseURL?: string) {
    this._baseURL = baseURL || '';
  }

  get: HTTPMethod = (url = '', options = {}) => {
    let resURL = `${this._baseURL}${url}`;
    const { data } = options;

    if (data) {
      resURL = queryStringify(data);
    }

    return this.request(resURL, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    const resURL = `${this._baseURL}${url}`;

    return this.request(resURL, { ...options, method: METHODS.POST });
  }

  put: HTTPMethod = (url, options = {}) => {
    const resURL = `${this._baseURL}${url}`;

    return this.request(resURL, { ...options, method: METHODS.PUT });
  }

  delete: HTTPMethod = (url, options = {}) => {
    const resURL = `${this._baseURL}${url}`;

    return this.request(resURL, { ...options, method: METHODS.DELETE });
  }

  request: HTTPMethodRequest = (url, options) => {
    const {
      method,
      headers,
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;
      if (headers) {
        headers.forEach((value, header) => xhr.setRequestHeader(header, value))
      }

      xhr.onload = () => {
        let response = '';
        try {
          response = JSON.parse(xhr.responseText);
        } catch (error) {
          // Send error to logger
        }

        const data = {
          response,
          status: xhr.status,
        }
        resolve(data);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }

      setTimeout(() => {
        xhr.abort();
      }, timeout)
    })
  };
}

function queryStringify(data: [string, string][] | object): string {
  let result = '?';

  for (const [key, value] of Object.entries(data)) {
    result += `${key}=${value.toString()}&`;
  }

  return result.slice(0, result.length - 1);
}

function fetchWithRetry(url: string, options: Options): unknown {
  const { retries = 2 } = options;

  if (retries === 0) {
    throw new Error('The number of attempts has been exhausted');
  }

  return new HTTP().get(url, options)
    .catch(() => fetchWithRetry(url, { ...options, retries: retries - 1 }))
}

export default HTTP;

export {
  fetchWithRetry,
}

export type {
  Options,
}
