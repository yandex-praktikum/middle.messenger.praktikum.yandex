import { v4 as makeUUID } from 'uuid';

import { EventBus } from './eventBus';

export type BaseProps = Record<string, any>;
export type ChildrenProps = Record<string, Block | Block[]>;

function replaceStub({ content }: HTMLTemplateElement, child: Block) {
  const stub = content.querySelector(`[data-id="${child.id}"]`);
  stub && stub.replaceWith(child.getContent());
}

export class Block<T extends BaseProps = NonNullable<unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  id = makeUUID();

  private readonly _props: T;
  private readonly _children: ChildrenProps;

	private readonly _initialState: T | ChildrenProps;

  private _eventBus: EventBus = new EventBus();
  private _element: HTMLElement | null = null;

  private _shouldUpdate = false;

  get element() {
    return this._element as HTMLElement;
  }

  get props() {
    return { ...this._props, ...this._children };
  }

	get events() {
		return Object.entries(this._props)
			.filter(([_, value]) => typeof value === 'function')
			.map(([prop, value]) => ([prop.replace('on', '').toLowerCase(), value]));
	}

  constructor(public readonly tagName: string,
              public readonly classNames: string,
              propsAndChildren: T | ChildrenProps
  ) {
		this._initialState = Object.assign({}, propsAndChildren);

    const { props, children } = this._getPropsAndChildren(propsAndChildren || {});

    this._props = this._makePropsProxy(props) as T;
    this._children = this._makePropsProxy(children);

    this._registerEvents();

    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _getPropsAndChildren(propsAndChildren: Partial<T | ChildrenProps>) {
    const props: BaseProps = {};
    const children: ChildrenProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value) && value[0] instanceof Block) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy(props: BaseProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: BaseProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: BaseProps, prop: string, value: unknown) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._shouldUpdate = true;
        }

        return true;
      }
    });
  }

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._element = document.createElement(this.tagName);
    this._element.classList.add(...this.classNames.split(' '));

    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(el => el.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      return;
    }

    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  setProps(newProps: Partial<T | ChildrenProps>) {
    this._shouldUpdate = false;

    const oldProps = { ...this._props, ...this._children };

    const { props, children } = this._getPropsAndChildren(newProps);

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

		Object.keys(newProps)
			.filter(key => key in this._props && key in this._children)
			.forEach(key => {
				if (this._children[key] === newProps[key]) {
					delete this._props[key];
				} else {
					delete this._children[key];
				}
			});

    if (this._shouldUpdate) {
      this._shouldUpdate = false;
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
    }
  }

  private _addEvents() {
		this.events.forEach(([eventName, callback]) => {
			this.element.addEventListener(eventName, callback);
		});
  }

  private _removeEvents() {
		this.events.forEach(([eventName, callback]) => {
			this.element.removeEventListener(eventName, callback);
		});
  }

  compile(template?: ((props: BaseProps) => string) | null, props?: BaseProps): DocumentFragment {
    const propsAndStubs: BaseProps = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = [];

        child.forEach(el => {
          propsAndStubs[key].push(`<div data-id="${el.id}"></div>`);
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = template ? template(propsAndStubs) : Object.values(propsAndStubs).join('');

    Object.values(this._children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(el => replaceStub(fragment, el));
      } else {
        replaceStub(fragment, child);
      }
    });

    return fragment.content;
  }

  render(): DocumentFragment {
    return document.createElement('template').content;
  }

  private _render() {
    const block = this.render();

		this._removeEvents();

    this.element.innerHTML = '';

    if ('attr' in this._props) {
      Object.keys(this._props.attr)
        .filter(attr => ![undefined, null, ''].includes(this._props.attr[attr]))
        .forEach(attr => {
          this.element!.setAttribute(attr, this._props.attr[attr]);
        });
    }

    this.element.appendChild(block);

    this._addEvents();
  }

  getContent() {
    return this.element;
  }

	resetState() {
		this.setProps(this._initialState);
		this.element.className = this.classNames;

		Object.values(this._children).forEach(child => {
			if (Array.isArray(child)) {
				child.forEach(it => it.resetState());
			} else {
				child.resetState();
			}
		});
	}

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}
