import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './EventBus.ts'

type Children = Record<string, Block>

export type Props = {
  events?: { [eventName: string]: (e: Event) => void }
  withId?: boolean
  [prop: string]: unknown
}

export type PropsAndChildren = {
  children?: Children
  props?: Props
  blockArrays?: Record<string, Block[]>
  [prop: string]: unknown
}

export type BlockArrays = Record<string, Block[]>

export default class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  }

  private _element: Element | null = null
  protected id: string = ''
  protected eventBus: () => EventBus
  props: Props
  children: Children
  blockArrays: BlockArrays

  public constructor(propsAndChildren: PropsAndChildren = {}) {
    const eventBus = new EventBus()
    this.eventBus = () => eventBus
    const { children, props, blockArrays } =
      this._getChildrenAndProps(propsAndChildren)

    if (props.withId) {
      this.id = nanoid(6)
      this.props = this._makePropsProxy({ ...props, id: this.id })
    } else {
      this.props = this._makePropsProxy(props)
    }

    this.children = children
    this.blockArrays = blockArrays
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CWU, this.componentWillUnmount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName)
    if (this.id) {
      element.dataset.id = this.id
    }

    return element
  }

  private _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  init() {}

  private _componentDidMount() {
    this.componentDidMount()

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate(oldProps?: Props, newProps?: Partial<Props>) {
    oldProps = { ...oldProps, ...newProps }
    return true
  }

  componentWillUnmount() {}

  get element() {
    if (!this._element) {
      throw new Error('Нет элемента')
    }
    return this._element
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render() {
    const newElement = this.render()
    if (this._element) {
      this.removeEvents()
      this._element.replaceWith(newElement)
    }
    this._element = newElement
    this.addEvents()
  }

  render(): Element {
    return document.createElement('div')
  }

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props }
    const listId = nanoid(6)

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    Object.keys(this.blockArrays).forEach((key) => {
      propsAndStubs[key] = `<div data-id="__l_${listId}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
      if (stub) {
        stub.replaceWith(child.element)
      }
    })

    Object.values(this.blockArrays).forEach((child) => {
      const listCont = this._createDocumentElement(
        'template'
      ) as HTMLTemplateElement

      child.forEach((item) => {
        if (item) {
          listCont.content.append(item.element)
        } else {
          listCont.content.append(`${item}`)
        }
      })

      const stub = fragment.content.querySelector(`[data-id="__l_${listId}"]`)
      if (stub) {
        stub.replaceWith(listCont.content)
      }
    })

    if (!fragment.content.firstElementChild) {
      throw new Error('Нет элемента')
    }

    return fragment.content.firstElementChild
  }

  private _getChildrenAndProps(propsAndChildren: PropsAndChildren): {
    props: Props
    children: Children
    blockArrays: BlockArrays
  } {
    const children: Children = {}
    const props: Props = {}
    const blockArrays: BlockArrays = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        blockArrays[key] = value
      } else if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children, blockArrays }
  }

  private _makePropsProxy(props: Props) {
    const { eventBus } = this

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target, prop: string, value) {
        const oldProps = {
          ...target,
        }
        target[prop] = value
        eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)

        return true
      },
    })
  }

  private removeEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName])
      })
    }
  }

  private addEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this.element.addEventListener(eventName, events[eventName])
      })
    }
  }
}
