import { expect } from 'chai'
import Sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon'
import { HTTPTransport, Options } from './HTTPTransport'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  const instance: HTTPTransport = new HTTPTransport()
  let requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest()
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }
  })

  afterEach(() => {
    requests = []
  })

  it('Отправка GET запроса', () => {
    instance.get('/auth/user', {})
    const [request] = requests
    expect(request.method).to.eq('GET')
  })

  it('Отправка POST запроса', () => {
    instance.post('/auth/signin', {})
    const [request] = requests
    expect(request.method).to.eq('POST')
  })

  it('Должен отправлять запрос с телом', () => {
    const options: Options = { body: { user: 'test' } }
    instance.post('/auth/signin', options)
    const [request] = requests
    expect(request.requestBody).to.eq(JSON.stringify(options.body))
  })

  it('Должен быть заголовок content-type', () => {
    const options: Options = { body: { user: 'test' } }
    instance.post('/auth/signin', options)
    const [request] = requests
    expect(request.requestHeaders['Content-Type']).to.include(
      'application/json'
    )
  })
})
