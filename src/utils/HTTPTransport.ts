enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export default class HTTPTransport {
  get = (url: string, options: any = {}) => {
    const { data } = options
    const dataString = queryStringify(data)
    const newURL = url + dataString
    return this.request(
      newURL,
      { ...options, method: METHODS.GET },
      options.timeout,
    )
  }
  put = (url: string, options: any = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    )
  }
  post = (url: string, options: any = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    )
  }
  delete = (url: string, options: any = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    )
  }

  request = (url: string, options: any, timeout = 5000) => {
    const { method, data, headers = {} } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }
      xhr.timeout = timeout

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = () => reject(new Error('Запрос отменен'))
      xhr.onerror = () => reject(new Error('Ошибка при подключении'))
      xhr.ontimeout = () => reject(new Error('Время ожидания истекло'))

      if (options.method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}

function queryStringify(data: any) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  let dataString = '?'
  for (let key in data) {
    if (dataString.endsWith('?')) dataString += `${key}=${data[key]}`
    else dataString += `&${key}=${data[key]}`
  }
  return dataString
}
