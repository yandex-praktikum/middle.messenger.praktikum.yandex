export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method
  content_type?: string
  data?: any
}

function queryStringify(data: Record<string, any>): string | never {
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Input must be an object')
  }

  const queryStrings: string[] = []

  function processValue(key: string, value: any) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => processValue(`${key}[${index}]`, item))
    } else if (typeof value === 'object') {
      for (const innerKey in value) {
        if (value.hasOwnProperty(innerKey)) {
          processValue(`${key}[${innerKey}]`, value[innerKey])
        }
      }
    } else {
      queryStrings.push(`${key}=${value}`)
    }
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      processValue(key, data[key])
    }
  }

  return queryStrings.join('&')
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path)
  }

  // create chat  '/chats', { title: title }
  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    })
  }

  public put<Response = void>(
    path: string,
    data: unknown,
    content_type: string = 'json',
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
      content_type,
    })
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    })
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    })
  }

  // replacement to fetch
  // XMLHttpRequest is defined in lib.dom
  private request<Response>(
    url: string,
    options: Options = { method: Method.Get, content_type: 'json' },
  ): Promise<Response> {
    const { method, data, content_type } = options
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })
      xhr.withCredentials = true

      if (method === Method.Get || !data) {
        xhr.responseType = 'json'
        xhr.send()
      } else {
        if (content_type == 'multipart/form-data') {
          xhr.setRequestHeader('Content-Type', 'multipart/form-data')
          console.log("HTTPTransport data.get('avatar')", data.get('avatar'))
          xhr.send(data)
          // console.log(queryStringify(data))
          // xhr.send(queryStringify(data))
        } else {
          xhr.responseType = 'json'
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
        }
      }
    })
  }
}
