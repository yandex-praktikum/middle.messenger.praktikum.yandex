enum METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

type TOptions = {
  method: METHODS;
  data?: Record<string, string | number>;
  headers?: Record<string, string>;
  timeout?: number;
};

type TOptionsWithoutMethod = Omit<TOptions, "method">;

type HTTPMethod = (
  url: string,
  options?: TOptionsWithoutMethod
) => Promise<unknown>;

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    let getParams = "";
    if (options.data) {
      getParams = this.queryStringify(options.data);
    }

    return this.request(
      url + getParams,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };
  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };
  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };
  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  private queryStringify<T>(data: Record<string, T>): string {
    return Object.keys(data)
      .map((key, index) =>
        index == 0 ? `?${key}=${data[key]}` : `&${key}=${data[key]}`
      )
      .join("");
  }

  request = (url: string, options: TOptions, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, url);
      xhr.onload = () => resolve(xhr);
      xhr.timeout = timeout;

      if (headers) {
        Object.keys(headers).forEach((key: string) =>
          xhr.setRequestHeader(key, headers[key])
        );
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      method === "GET" ? xhr.send() : xhr.send(JSON.stringify(data));
    });
  };
}

export { HTTPTransport };
