import { v4 as uuid } from "uuid";
import EventBus from "./EventBus";

// использую any, потому что не получилось типизировать по хорошему,
// а время на исходе)

type Props = Record<string, any>;

export default abstract class Block {
  children: Props;
  props: Props;
  eventBus: () => EventBus;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: any = null;
  _meta: any = null;
  _id: any = null;

  constructor(tagName = "div", propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    if (props.withId) {
      this._id = uuid();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _getChildren(propsAndChildren: Props) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    })

    return { children, props };
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string): any {
    const element = document.createElement(tagName);
    if (this._id) {
      element.dataset.id = this._id;
    }

    return element;
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: Props) {
    console.log(oldProps);
  }

  dispatchComponentDidMount() {}

  setProps = (newProps: Props) => {
    if (!newProps) {
      return;
    }

    this._componentDidUpdate(this.props, newProps);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, newProps);
    // Object.assign(this.props, newProps);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      Object.assign(oldProps, newProps);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props) {
    let update = false;
    Object.keys(newProps).forEach((key) => {
      if (oldProps[key] !== newProps[key]) {
        update = true;
      }
    })

    return update;
  }

  _render() {
    const block = this.render();

    this._removeEvents();
    this._element.innerHTML = '';

    this._element.appendChild(block);
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): any {}

  compile(template: Function, props: Props) {
    if (this.children) {
      const propsAndStubs = { ...props };

      Object.entries(this.children).forEach(([key, child]: [string, any]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      })

      const fragment = this._createDocumentElement('template');
      fragment.innerHTML = template(propsAndStubs);

      Object.values(this.children).forEach((child: Props) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub.replaceWith(child.getContent());
      });

      return fragment.content;
    }

    return template(props);
  }

  _addEvents() {
    const { events = new Map() } = this.props;

    events.forEach((eventFun: Function, eventName: string) => {
      if (eventName === 'blur') {
        this._element.querySelector('input')?.addEventListener(eventName, eventFun);
      } else {
        this._element.addEventListener(eventName, eventFun);
      }
    })
  }

  _removeEvents() {
    const { events = new Map() } = this.props;

    events.forEach((eventFun: Function, eventName: string) => {
      if (eventName === 'blur') {
        this._element.querySelector('input')?.removeEventListener(eventName, eventFun);
      } else {
        this._element.removeEventListener(eventName, eventFun);
      }

      // if (eventName === 'submit') {
      //   this._element.querySelector('form')?.removeEventListener(eventName, eventFun);
      // } else {
      //   this._element.removeEventListener(eventName, eventFun);
      // }
    })
  }

  getContent() {
    return this.element;
  }

  get element() {
    return this._element;
  }

  _makePropsProxy(props: Props) {
    const self = this;
    const proxyProps = new Proxy(props, {
      set(target: any, prop: string, newValue) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Permission denied');
        }

        target[prop] = newValue;
        self.eventBus().emit(Block.EVENTS.INIT);

        return true;
      },
      deleteProperty() {
        throw new Error('Permission denied');
      },
    })

    return proxyProps;
  }
}
