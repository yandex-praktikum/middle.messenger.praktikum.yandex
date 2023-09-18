enum METHODS {
    GET= 'GET',
    POST =  'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type IOptionsRequest ={
    data?:Object;
    method:METHODS.GET|METHODS.POST|METHODS.PUT|METHODS.DELETE;
    timeout?:number;
    headers?:{key:string,value:string}[]
}
/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data:Object) {
    // Можно делать трансформацию GET-параметров в отдельной функции
    //if(!data)return ''
    let result='?';
    result=result+Object.entries(data).map(([key, value])=>{  return `${key}=${Array.isArray(value)?value.join(','):String(value)}`
    }).join("&")
    return result;
}

class HTTPTransport {
    get = (url:string, options:IOptionsRequest = {method: METHODS.GET}) => {
        return this.request(url, {
            ...options,
            data: queryStringify(options.data||{})||'' ,
            method: METHODS.GET
        }, options.timeout);
    };

    put = (url:string, options:IOptionsRequest = {method: METHODS.PUT}) => {

        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    post = (url:string, options:IOptionsRequest = {method: METHODS.POST}) => {

        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    delete = (url:string, options:IOptionsRequest = {method: METHODS.DELETE}) => {

        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };
    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url:string, options:IOptionsRequest = {method: METHODS.GET}, timeout = 5000) => {
        const {method, headers, data} = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            const isGet = method === METHODS.GET;
            xhr.open(method, isGet ? `${url}${data}` : url,);


            if (headers) { // @ts-ignore
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }


            xhr.onload = function () {
                resolve(xhr);
            };

            /*        const handleError = err => {
                        reject(err);
                    };*/

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

