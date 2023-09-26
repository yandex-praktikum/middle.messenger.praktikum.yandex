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
  method: string,
  headers?: [string, string],
  data?: [string, string][],
  timeout?: number,
  retries?: number,
}

type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

class HTTP implements IHTTP {
  get: HTTPMethod = (url, options) => {
    let resUrl = url;
    const { data } = options;

    if (data) {
      resUrl = queryStringify(data);
    }

    return this.request(resUrl, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request: HTTPMethod = (url, options) => {
    const {
      method,
      headers,
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) xhr.setRequestHeader(...headers);

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }

      setTimeout(() => {
        xhr.abort();
      }, timeout)
    })
  };
}

function queryStringify(data: [string, string][]): string {
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
