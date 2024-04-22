import { expect } from 'chai'
import sinon from 'sinon'
import Block, { Props, PropsAndChildren } from './Block'

describe('Block', () => {
  let block: TestableBlock

  class TestableBlock extends Block {
    constructor(props: Props) {
      super(props)
    }

    public getEventBus() {
      return this.eventBus()
    }

    public getId() {
      return this.id
    }
  }

  beforeEach(() => {
    const propsAndChildren: PropsAndChildren = {
      withId: true,
      events: {
        click: sinon.fake(),
      },
    }

    block = new TestableBlock(propsAndChildren)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Должен иницализироваться с id когда есть свойство withId', () => {
    expect(block.getId()).to.be.a('string').that.has.length(6)
  })

  it('Должен вызывать методы жизненного цикла init и component-did-mount', () => {
    const spyInit = sinon.spy(block, 'init')
    const spyCDM = sinon.spy(block, 'componentDidMount')
    block.getEventBus().emit('init')
    block.getEventBus().emit('flow:component-did-mount')
    expect(spyInit.calledOnce).to.be.true
    expect(spyCDM.calledOnce).to.be.true
  })

  it('Должен обновлять свойства и вызывать метод component-did-update', () => {
    const spyCDU = sinon.spy(block, 'componentDidUpdate')
    block.setProps({ newProp: 'newValue' })
    expect(block.props.newProp).to.equal('newValue')
    expect(spyCDU.calledOnce).to.be.true
  })

  it('Должен добавлять и удалять обработчики событий', () => {
    const addSpy = sinon.spy(block, 'addEvents' as keyof TestableBlock)
    const removeSpy = sinon.spy(block, 'removeEvents' as keyof TestableBlock)
    block.getEventBus().emit('flow:render')
    block.getEventBus().emit('flow:component-will-unmount')
    expect(addSpy.calledOnce).to.be.true
    expect(removeSpy.calledOnce).to.be.true
  })

  it('Должен создавать html элемент', () => {
    block.compile('<div></div>', {})
    const element = block.element
    expect(element.tagName).to.equal('DIV')
  })
})
