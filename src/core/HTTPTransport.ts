export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

function queryStringify(data: XMLHttpRequestBodyInit) {
  const keysArr = Object.keys(data)
  const queryArr = []

  for (let i = 0; i < keysArr.length; i++) {
    if (Array.isArray(data[keysArr[i]])) {
      queryArr.push(`${keysArr[i]}=${data[keysArr[i]].join()}`)
    } else {
      queryArr.push(`${keysArr[i]}=${data[keysArr[i]]}`)
    }
  }

  return `?${queryArr.join('&')}`
}

export type Options = {
  method: keyof typeof METHODS
  data: XMLHttpRequestBodyInit
  headers: Record<string, string>
  timeout: number
}

export default class HTTPTransport {
  get(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  patch(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.PATCH },
      options.timeout
    )
  }

  delete(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request(url: string, options: Options, timeout = 5000) {
    const { method, headers, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const xhrURL =
        method === METHODS.GET && data ? `${url}${queryStringify(data)}` : url

      xhr.open(method, xhrURL)
      xhr.timeout = timeout

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }

      xhr.onload = () => {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
