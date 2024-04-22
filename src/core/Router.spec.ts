import { expect } from 'chai'
import sinon from 'sinon'
import Block from './Block.ts'
import Router from './Router.ts'

class TestBlock extends Block {
  render(): Element {
    return this.compile('<div></div>', this.props)
  }
}

const testBlock = new TestBlock({})

describe('Router', function () {
  beforeEach(function () {
    this.router = new Router('#app')
  })

  it('Должен добавлять маршруты используя use()', function () {
    this.router.use('/test', testBlock)
    expect(this.router.routes).to.have.lengthOf(1)
  })

  it('Должен выполнять переход по go()', function () {
    const stub = sinon.stub(window.history, 'pushState')
    this.router.use('/test', testBlock)
    this.router.go('/test')
    expect(stub.calledWith({}, '', '/test')).to.be.true
    stub.restore()
  })

  it('Должен совершать переходы используя back() и forward()', function () {
    const stubBack = sinon.stub(window.history, 'back')
    const stubForward = sinon.stub(window.history, 'forward')

    this.router.back()
    expect(stubBack.called).to.be.true

    this.router.forward()
    expect(stubForward.called).to.be.true

    stubBack.restore()
    stubForward.restore()
  })
})
