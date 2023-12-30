import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  public id = nanoid(6)
  protected props: any
  protected refs: Record<string, Block> = {}
  public children: Record<string, Block>
  private eventBus: () => EventBus
  private _element: HTMLElement | null = null
  private _meta: { props: any }

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = {
      props,
    }

    this.children = children
    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {}
    const children: Record<string, Block> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }
  _removeEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((event) => {
      this._element?.removeEventListener(event, events[event])
    })
  }
  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName], true)
    })
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _init() {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    )
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
    this._removeEvents()
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.render()
    this._removeEvents()

    const newElement = fragment.firstElementChild as HTMLElement

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs }

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content)
    })

    return temp.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  show() {
    this.getContent()!.style.display = 'block'
  }

  hide() {
    this.getContent()!.style.display = 'none'
  }
}

export default Block
