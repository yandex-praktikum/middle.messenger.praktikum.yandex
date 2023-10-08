const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

interface Options {
  timeout?: number;
  data?: object;
  method?: string;
  headers?: object;
  query?: object;
}

function queryStringify(data: object): string {
  let query = "?";
  for (const [key, value] of Object.entries(data)) {
    query = query.concat(key, "=", value, "&");
  }
  query = query.slice(0, -1);
  return query;
}

function setHeaders(xhr: XMLHttpRequest, headers: object) {
  for (const [header, value] of Object.entries(headers)) {
    xhr.setRequestHeader(header, value);
  }
}

class HTTPClient {
  private base: string = "https://ya-praktikum.tech/api/v2";

  constructor(endpoint: string) {
    this.base = this.base.concat(endpoint);
  }

  get<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
    return this.request<TResponse>(
      this.base.concat(path),
      { ...options, method: METHODS.GET, query: options.data },
      options.timeout,
    );
  }

  post<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
    return this.request<TResponse>(
      this.base.concat(path),
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  }

  put(path: string, options: Options = {}) {
    return this.request(
      this.base.concat(path),
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  }

  delete(path: string, options: Options = {}) {
    return this.request(
      this.base.concat(path),
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  }

  request<TResponse>(
    url: string,
    options: Options,
    _timeout = 5000,
  ): Promise<TResponse> {
    const { method = "get", data, query = {}, headers = {} } = options;

    return new Promise<TResponse>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url.concat(queryStringify(query)));

      setHeaders(xhr, headers);

      xhr.onload = function () {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (e) {
          resolve(this.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
      }
      //setTimeout(reject, timeout);
    });
  }
}

export { HTTPClient };
