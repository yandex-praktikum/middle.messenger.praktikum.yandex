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
  if (!xhr || !headers) {
    return;
  }
  for (const [header, value] of Object.entries(headers)) {
    xhr.setRequestHeader(header, value);
  }
}

class HTTPClient {
  get = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET, query: options.data },
      options.timeout,
    );
  };
  post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };
  put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };
  delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (url: string, options: Options, _timeout = 5000) => {
    console.log("options", options);
    const { method = "get", data, query = {}, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url.concat(queryStringify(query)));

      setHeaders(xhr, headers);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
      //setTimeout(reject, timeout);
    });
  };
}

export { HTTPClient };
