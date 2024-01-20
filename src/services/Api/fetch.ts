import { METHODS, TOptions, TUrl } from './types';

function queryStringify(data = {}) {
  const string = Object.entries(data)
    .map(([key, value]) => {
      let tmpl = value;
      if (Array.isArray(value)) {
        tmpl = value.join(',');
      }
      return `${key}=${tmpl}`;
    })
    .join('&');

  if (string.length > 0) {
    return `?${string}`;
  }

  return string;
}

class HTTPTransport {
  get = (url: TUrl, options: Omit<TOptions, 'method'> = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: TUrl, options: Omit<TOptions, 'method'> = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: TUrl, options: Omit<TOptions, 'method'> = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: TUrl, options: Omit<TOptions, 'method'> = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: TUrl, options: TOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.addEventListener('load', () => {
        resolve(xhr);
      });

      xhr.addEventListener('abort', reject);
      // eslint-disable-next-line unicorn/prefer-add-event-listener
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

const client = new HTTPTransport();

export function fetchWithRetry(url: TUrl, options: TOptions) {
  const retries = options.retries || 1;
  let requestCount = 1;

  const request = (): Promise<unknown> | Error => {
    try {
      return client.request(url, options);
    } catch (error) {
      if (retries > requestCount) {
        requestCount += 1;
        return request();
      }
      throw error;
    }
  };

  return request();
}
