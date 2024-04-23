import { expect } from 'chai'
import Block from './Block.ts'
import { Route } from './Route.ts'

describe('Route', function () {
  const block = {} as Block

  it('Должен соответствовать маршруту', function () {
    const route = new Route('/test', block, { rootQuery: '#app' })
    expect(route.match('/test')).to.be.true
    expect(route.match('/another')).to.be.false
  })

  it('Должен инициализироваться с заданными параметрами', function () {
    const route = new Route('/test', block, { rootQuery: '#app' })
    expect(route._pathname).to.equal('/test')
    expect(route._blockClass).to.equal(block)
    expect(route._props.rootQuery).to.equal('#app')
  })
})
