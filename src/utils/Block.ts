import Handlebars from 'handlebars'
import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'
import { isEqual } from './Helpers'

export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  public id = nanoid(6)
  protected props: P
  public children: Record<string, Block | Block[]>
  private eventBus: () => EventBus
  private _element: HTMLElement | null = null

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: P) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this.children = children
    this.props = this._makePropsProxy(props)
    this.eventBus = () => eventBus

    // register the events from static EVENTS on the bus with private methods as handlers
    this._registerEvents(eventBus)
    // emit initialization
    eventBus.emit(Block.EVENTS.INIT)
  }

  /**
   * @description separates cheldren and properties from one object
   *
   * @param {P} childrenAndProps
   *
   * */
  _getChildrenAndProps(childrenAndProps: P): {
    props: P
    children: Record<string, Block | Block[]>
  } {
    const props: Record<string, unknown> = {}
    const children: Record<string, Block | Block[]> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key as string] = value
      } else if (value instanceof Block) {
        children[key as string] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children }
  }

  // add eventlisteners to this.element, called from _render()
  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }
  // remove eventlisteners from this.element, called from _render()
  _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> }

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }
  // registers static EVENTS, called from constructor
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  // calls this.init amd emits Block.EVENTS.FLOW_RENDER, binded to Block.EVENTS.INIT
  private _init() {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }
  protected init() {}

  _componentDidMount() {
    this.componentDidMount()
  }
  componentDidMount() {}

  // emits Block.EVENTS.FLOW_CDM on element and every child
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  // emits Block.EVENTS.FLOW_RENDER
  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }
  protected componentDidUpdate(oldProps: P, newProps: Partial<P>) {
    return !isEqual(oldProps, newProps)
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
    this.componentDidUpdate(this.props, nextProps)
  }
  getProps = (key: string) => {
    const value = this.props[key]
    return value
  }

  get element() {
    return this._element
  }

  /**
   * @description replaces the element with the html from this.render()
   * and calls _addEvents
   * */
  private _render() {
    const fragment = this.render()

    const newElement = fragment.firstElementChild as HTMLElement

    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  /**
   * @description this method is called from the heir element (Button, Input, page etc..) as render()
   *
   * @param {template} template (handlebars)
   * @param {} context with the props and children
   * */
  protected compile(template: (context: any) => string, context: any) {
    // console.log(context)
    // 1. create an object with the props and children,
    // later will add dummy HTML elements for each to keep the tree
    const contextAndDummies = { ...context }
    // console.log(contextAndDummies)

    // 2. create a dummy with id for each passed Block and children
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndDummies[name] = component.map((child) => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndDummies[name] = `<div data-id="${component.id}"></div>`
      }
    })
    // 3. generates html string with each Block element replaced with a dummy
    const html = Handlebars.compile(template)(contextAndDummies)

    // 4. create an Element with dummies
    const temp = document.createElement('template')
    temp.innerHTML = html

    /**
     * @description Replaces a dummy element with a real one, storing all childNodes in the component
     *
     * @param {Block} component (handlebars)
     * */
    const replaceDummy = (component: Block) => {
      // find a dummy with Block id
      const dummy = temp.content.querySelector(`[data-id="${component.id}"]`)
      if (!dummy) return
      // get the element and append all childNodes
      component.getContent()?.append(...Array.from(dummy.childNodes))
      // replace a dummy with the real element with all the events
      dummy.replaceWith(component.getContent()!)
    }

    // 5. replace all dummmies with the real elements
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((comp) => replaceDummy(comp))
      } else {
        replaceDummy(component)
      }
    })

    return temp.content
  }

  /** @description this method is replaced in each heir and returns this.compile*/
  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  // returns this.elemet
  getContent() {
    return this.element
  }

  /**
   * @description creates a proxy for the props
   *
   * @param {P} props
   * */
  _makePropsProxy(props: P) {
    const self = this

    return new Proxy(props, {
      get(target, key: string) {
        if (typeof key === 'string' && key.startsWith('_')) {
          throw new Error('No access')
        }
        const value = target[key]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, key: string, value) {
        if (typeof key === 'string' && key.startsWith('_')) {
          throw new Error('No access')
        }
        const oldTarget = { ...target }

        target[key as keyof P] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('No access')
      },
    })
  }
}
