import { EventBus } from "..";
import Handlebars from "handlebars";
import { v4 as uuidv4 } from "uuid";

type Meta = {
  props: unknown;
};

type Children = Record<string, Component>;

export class Component {
  static EVENTS = {
    INIT: "INIT",
    FLOW_COMPONENT_DID_MOUNT: "flow:component_did_mount",
    FLOW_COMPONENT_DID_UPDATE: "flow:componet_did_update",
    FLOW_COMPONENT_RENDER: "flow:component_render",
    FLOW_COMPONENT_WILL_UNMOUNT: "flow:component_will_unmount",
  };

  private _element: HTMLElement | null = null;
  private _meta: Meta;
  private eventBus: () => EventBus;
  protected props: any;
  protected children: Children;
  public id = uuidv4();

  constructor(propsWithChildren: object = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    this._meta = {
      props,
    };

    this.children = children;
    this.props = this.makePropsProxy(props);
    this.eventBus = () => eventBus;

    this.registerEvents();

    eventBus.dispatch(Component.EVENTS.INIT);
  }

  private getChildrenAndProps(propsWithChildren: object) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Component> = {};

    for (const [key, value] of Object.entries(propsWithChildren)) {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    }

    return { props, children };
  }

  private addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private registerEvents(): void {
    this.eventBus().register(Component.EVENTS.INIT, this._init.bind(this));
    this.eventBus().register(
      Component.EVENTS.FLOW_COMPONENT_DID_MOUNT,
      this._componentDidMount.bind(this),
    );
    this.eventBus().register(
      Component.EVENTS.FLOW_COMPONENT_DID_UPDATE,
      this._componentDidUpdate.bind(this),
    );
    this.eventBus().register(
      Component.EVENTS.FLOW_COMPONENT_RENDER,
      this._render.bind(this),
    );
  }

  private _init(): void {
    this.init();
    this.eventBus().dispatch(Component.EVENTS.FLOW_COMPONENT_RENDER);
  }

  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount() {
    this.eventBus().dispatch(Component.EVENTS.FLOW_COMPONENT_DID_MOUNT);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount(),
    );
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().dispatch(Component.EVENTS.FLOW_COMPONENT_RENDER);
    }
  }

  protected componentDidUpdate(
    oldProps?: unknown,
    newProps?: unknown,
  ): boolean {
    return true;
  }

  public setProps(props: object) {
    Object.assign(this.props, props);
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();
  }

  private compile(template: string, context: object) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = Handlebars.compile(template)(contextAndStubs);

    const templateElement = document.createElement("template");

    templateElement.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(templateElement.content);
    });

    return templateElement.content;
  }

  protected render(): string {
    return "";
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private makePropsProxy(props: any): ProxyHandler<any> {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self
          .eventBus()
          .dispatch(
            Component.EVENTS.FLOW_COMPONENT_DID_UPDATE,
            oldTarget,
            target,
          );
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }
}
