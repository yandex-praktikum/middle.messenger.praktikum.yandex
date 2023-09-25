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

class HTTP implements IHTTP {
  get = (url: string, options: Options = { method: METHODS.GET }) => {
    let resUrl = url;
    const { data } = options;

    if (data) {
      resUrl = queryStringify(data);
    }

    return this.request(resUrl, options);
  };

  post = (url: string, options: Options = { method: METHODS.POST }) => {
    return this.request(url, options);
  }

  put = (url: string, options: Options = { method: METHODS.PUT }) => {
    return this.request(url, options);
  }

  delete = (url: string, options: Options = { method: METHODS.DELETE }) => {
    return this.request(url, options);
  }

  request = (url: string, options: Options) => {
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
