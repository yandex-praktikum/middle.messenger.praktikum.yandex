import { isEmpty } from '@utilities';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce((acc, [key, value], index) => {
    const connector = index === 0 ? '' : '&';
    return acc.concat(`${connector}${key}=${value.toString()}`);
  }, '?');
}

export class HTTPTransform {

  get: HTTPMethod = (url, options = {}) => {
    if (!isEmpty(options.data)) {
      url += queryStringify(options.data!);
    }

    return this.request(url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.timeout = 5000;

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || isEmpty(data)) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
