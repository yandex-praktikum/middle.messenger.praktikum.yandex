import EventBus from './EventBus'

export type Props = Record<string, unknown>

export default class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: null | HTMLElement = null
  private _meta: {tagName: string, props: Props}
  props: Props
  eventBus: () => EventBus

  constructor(tagName: string = 'div', props = {}) {
    const eventBus = new EventBus()
    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy(props)

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
    return oldProps;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    this.componentDidUpdate(oldProps, newProps)
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props) {
    console.log(oldProps, newProps);
    return true
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render() {
    const block = this.render()
    this._element!.innerHTML = block ?? ''
  }

  render() {
    return '';
  }

  getContent() {
    return this._element
  }

  private _makePropsProxy(props: Props) {
    const propsProxy = new Proxy(props, {
      get(target, prop: string) {
        if(prop.indexOf('_') === 0) {
          throw new Error('Нет доступа');
        }
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target, prop: string, value) {
        if(prop.indexOf('_') === 0) {
          throw new Error('Нет доступа');
        }
        target[prop] = value
        return true
      },

      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })

    return propsProxy
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
