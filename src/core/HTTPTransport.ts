export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options: Options) => Promise<XMLHttpRequest>

export type Options = {
  method?: keyof typeof METHODS
  body?: Record<string, number | number[] | string | FormData> | FormData
  headers?: Record<string, string>
  timeout?: number
}

export function queryStringify(data: { [index: string]: unknown }) {
  const keysArr = Object.keys(data)
  const queryArr: string[] = []

  for (let i = 0; i < keysArr.length; i++) {
    const value = data[keysArr[i]]
    if (Array.isArray(value)) {
      queryArr.push(`${keysArr[i]}=${value.join()}`)
    } else {
      queryArr.push(`${keysArr[i]}=${value}`)
    }
  }

  return `?${queryArr.join('&')}`
}

export class HTTPTransport {
  get: HTTPMethod = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post: HTTPMethod = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put: HTTPMethod = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete: HTTPMethod = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request(url: string, options: Options, timeout = 0): Promise<XMLHttpRequest> {
    const { method, headers, body } = options

    if (!method) {
      throw new Error('Method not implemented')
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const xhrURL =
        method === METHODS.GET &&
        typeof body === 'object' &&
        !(body instanceof FormData)
          ? `${url}${queryStringify(body)}`
          : url

      xhr.open(method, xhrURL)
      xhr.withCredentials = true
      xhr.timeout = timeout

      if (typeof body === 'object' && !(body instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }

      xhr.onload = () => {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !body) {
        xhr.send()
      } else if (body instanceof FormData) {
        xhr.send(body)
      } else {
        xhr.send(JSON.stringify(body))
      }
    })
  }
}

export default new HTTPTransport()
