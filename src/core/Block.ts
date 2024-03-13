import EventBus from './EventBus'

type Children = Record<string, Block>

export type Props = {
  events?: { [eventName: string]: (e: Event) => void }
  [prop: string]: unknown
}

export type PropsAndChildren = {
  children?: Children
  props?: Props
  [prop: string]: unknown
}

export default class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: null | HTMLElement = null
  private _meta: { tagName: string; propsAndChildren: PropsAndChildren }
  public props: Props
  public children: Children
  protected eventBus: () => EventBus

  constructor(
    tagName: string = 'div',
    propsAndChildren: PropsAndChildren = {}
  ) {
    const eventBus = new EventBus()
    this._meta = {
      tagName,
      propsAndChildren,
    }
    const { children, props } = this._getChildrenAndProps(propsAndChildren)
    this.props = this._makePropsProxy(props)
    this.children = children
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  init() {
    this._createResources()
  }

  private _componentDidMount() {
    this.componentDidMount(this.props)
  }

  componentDidMount(oldProps: Props) {
    return oldProps
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    this.componentDidUpdate(oldProps, newProps)
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props) {
    console.log(oldProps, newProps)
    return true
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render() {
    this._removeEvents()
    this._element!.innerHTML = this.render()
    this._addEvents()
  }

  render() {
    return ''
  }

  getContent() {
    return this._element
  }

  private _getChildrenAndProps(propsAndChildren: PropsAndChildren): {
    props: Props
    children: Children
  } {
    const children: Children = {}
    const props: Props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  private _makePropsProxy(props: Props) {
    const { eventBus } = this

    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа')
        }
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target, prop: string, value) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа')
        }
        const oldProps = {
          ...target,
        }
        target[prop] = value
        eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)

        return true
      },
    })
  }

  _removeEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName])
      })
    }
  }

  _addEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName])
      })
    }
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
