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
  method?: string,
  headers?: Map<string, string>,
  data?: [string, string][] | object,
  timeout?: number,
  retries?: number,
}

type XHRInstance = {
  status: number,
  responseText: string,
}

type HTTPMethod = (url: string, options?: Options) => Promise<XHRInstance>;

class HTTP implements IHTTP {
  get: HTTPMethod = (url, options = {}) => {
    let resUrl = url;
    const { data } = options;

    if (data) {
      resUrl = queryStringify(data);
    }

    return this.request(resUrl, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request: HTTPMethod = (url, options = {}) => {
    const {
      method,
      headers,
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method) {
        xhr.open(method, url);
      }
      xhr.withCredentials = true;
      if (headers) {
        headers.forEach((value, header) => xhr.setRequestHeader(header, value))
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data as FormData);
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
