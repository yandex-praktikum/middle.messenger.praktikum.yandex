import { isEqual } from "../isEqual";
import { EventBus } from "./eventBus";
import { v4 as makeUUID } from "uuid";
import Handlebars from "handlebars";

export type TProperties = Record<string, number | boolean | string>;

type TMeta = {
  tagName: string;
  props: unknown;
};

type TChildren<T extends object> = Record<string, Block<T>>;
type TEvents = Record<string, Record<string, () => void>>;

abstract class Block<Props extends object> {
  
  static EVENTS: Record<string, string> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement;
  protected _meta: TMeta;
  public props: Props;
  public children: TChildren<Block<Props>>;
  protected eventBus: EventBus;
  protected _id: string | null = null;
  protected _needId: boolean;

  protected constructor(propsAndChildren: Record<string, unknown>) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.eventBus = new EventBus();
    this._meta = {
      tagName: "template",
      props,
    };
    this._needId = (props.settings as Record<string, boolean>)?.withInternalID;
    this._id = this._needId ? makeUUID() : null;
    this.props = this._makePropsProxy({ ...props, _id: this._id }) as Props;
    this.children = this._makePropsProxy({ ...children }) as TChildren<Block<Props>>;

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  protected _getChildren<T>(propsAndChildren: Record<string, T>) {
    const children: Record<string, T> = {};
    const props: Record<string, T> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  protected _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  protected init() {
    this._createResources();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children as TChildren<Block<Props>>).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  protected dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) return;
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return !isEqual(oldProps, newProps);
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public setChildren = (nextChildren: TChildren<Props>) => {
    if (!nextChildren) {
      return;
    }

    Object.assign(this.children, nextChildren);
  };

  protected get element() {
    return this._element;
  }

  protected compile<T>(
    tmpl: string,
    props: Record<string, T>
  ): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      (propsAndStubs[key] as unknown) = `<div data-id="${child._id}"></div>`;
    });

    const fragment: HTMLTemplateElement =
      this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(tmpl)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      // чтобы отрендерить массив детей без заглушки, рендерим всех
      // детей перед заглушкой и последнего ребенка вместо заглушки
      if (Array.isArray(child)) {
        child.forEach((item, index) => {
          if (index === child.length - 1) {
            stub?.replaceWith(item.getContent());
          } else {
            stub?.before(item.getContent());
          }
        });
      } else {
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  protected _addEvents(): void {
    const { events } = this.props as TEvents;

    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element.addEventListener(eventName, events[eventName]);
      });
    }
  }

  protected _removeEvents(): void {
    const { events } = this.props as TEvents;

    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  protected _render() {
    const block = this.render();
    this._removeEvents();
    const contentInsertFragment = block.firstElementChild as HTMLElement;
    // навешиваю айди template еще и на чилдрена, так как template
    //  удалится и нужно будет взаимодействовать с содержимым
    this._setId(contentInsertFragment);
    this._element.replaceWith(contentInsertFragment);
    this._element = contentInsertFragment;
    this._addEvents();
  }

  abstract render(): DocumentFragment;

  public getContent(): HTMLElement {
    return this.element;
  }

  protected _makePropsProxy<T>(props: Record<string, T>) {
    return new Proxy(props, {
      get: (target, prop: string): T => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(this) : value;
      },
      set: (target, prop, value): boolean => {
        const oldTarget = { ...target };
        target[prop as string] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }
  protected _setId(element: HTMLElement) {
    if (this._id !== null) {
      element.setAttribute("data-id", this._id);
    }
  }
  protected _createDocumentElement(tagName: string): HTMLTemplateElement {
    const element = document.createElement(tagName) as HTMLTemplateElement;

    this._setId(element);
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return element;
  }

  protected show() {
    this.getContent().style.display = "block";
  }

  protected hide() {
    this.getContent().style.display = "none";
  }
}

export { Block };
