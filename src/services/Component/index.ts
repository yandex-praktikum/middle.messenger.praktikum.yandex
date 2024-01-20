import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import EventBus from '../EventBus';
import { EVENTS, TBlockElement, TCompileContext, TPropsBase } from './types';

// eslint-disable-next-line no-use-before-define
type TRefsBase = Record<string, Component | Element>;

class Component<TProps extends TPropsBase = TPropsBase, Refs extends TRefsBase = TRefsBase> {
  static EVENTS = EVENTS;

  #element: TBlockElement = null;

  props: TProps;

  eventBus: EventBus;

  // eslint-disable-next-line no-use-before-define
  protected children: Record<string, Component>;

  // eslint-disable-next-line no-use-before-define
  protected refs: Refs = {} as Refs;

  public id = nanoid(6);

  constructor(propsWithChildren: TProps = {} as TProps) {
    const { props, children } = this.#getChildrenAndProps({ ...propsWithChildren });

    this.eventBus = new EventBus();

    this.props = this.#makePropsProxy(props);
    this.children = children;

    this.#registerEvents();
    this.eventBus.emit(Component.EVENTS.INIT);
  }

  #registerEvents() {
    this.eventBus.on(Component.EVENTS.INIT, this.#init.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUnmount.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  #getChildrenAndProps(childrenAndProps: TProps) {
    let props: TProps = {} as TProps;
    const children: typeof this.children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props = { ...props, [key]: value } as TProps;
      }
    });

    return { props, children };
  }

  #addEvents() {
    const { events } = this.props;

    if (!events) return;

    Object.entries(events).forEach(([eventName, event]) => {
      this.#element?.addEventListener(eventName, event);
    });
  }

  #componentDidMount() {
    this.componentDidMount();
  }

  #componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.#render();
  }

  #componentDidUnmount() {
    this.componentDidUnmount();
  }

  #init() {
    this.init();
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  #checkInDom() {
    const elementInDOM = document.body.contains(this.#element);

    if (elementInDOM) {
      setTimeout(() => this.#checkInDom(), 1000);
      return;
    }

    this.eventBus.emit(Component.EVENTS.FLOW_CWU, this.props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected componentDidMount(oldProps?: TProps) {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  protected componentDidUnmount() {}

  public setProps = (nextProps: Partial<TProps>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.#element;
  }

  #render() {
    const fragment = this.compile(this.render(), this.props);
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.#element) {
      this.#element.replaceWith(newElement);
    }

    this.#element = newElement;
    this.#addEvents();
  }

  private compile(template: string | null, props: TProps) {
    const compileContext: TCompileContext<TProps, typeof this.refs, typeof Component> = { ...props, __refs: this.refs };

    const html = Handlebars.compile(template)(compileContext);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    const fragment = temp.content;

    // eslint-disable-next-line unicorn/no-array-reduce
    this.refs = [...fragment.querySelectorAll('[ref]')].reduce(
      (list, element) => {
        const key = element.getAttribute('ref')!;
        list[key] = element as HTMLElement;
        element.removeAttribute('ref');
        return list;
      },
      // eslint-disable-next-line no-underscore-dangle
      compileContext.__refs as (typeof compileContext)['__refs']
    );

    // eslint-disable-next-line no-underscore-dangle
    compileContext.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): string | null {
    return null;
  }

  getContent() {
    return this.element;
  }

  #makePropsProxy(props: TProps) {
    return new Proxy<TProps>(props, {
      get: (target, prop) => {
        const value = target[prop as keyof TProps];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop as keyof TProps] = value;

        this.eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  // #createDocumentElement(tagName: string) {
  //   return document.createElement(tagName);
  // }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Component;
