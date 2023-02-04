import EventBus from "./EventBus";
import { v4 as uuidv4 } from "uuid";
import Handlebars from "handlebars";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    public id = uuidv4();

    private _element = null;
    private _meta;
    eventBus: EventBus;
    protected props: any;
    protected children: any;

    constructor(propsAndChildren = {}) {
        const { props, children } = this._getChildren(propsAndChildren);

        this.children = children;
        this._meta = { props };
        this.props = this._makePropsProxy(props);
        this.eventBus = new EventBus();
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    };

    _getChildren(propsAndChildren: any) {
        const children: any = {};
        const props: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };

    init() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    };

    componentDidMount() { };

    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            return;
        }

        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    };

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    };

    _render() {
        const block = this.render();
        const firstElem = block.firstElementChild;

        if (this._element) {
            this._removeEvents();
            (this._element as any).replaceWith(firstElem);
        }

        (this._element as any) = firstElem;
        this._addEvents();
    };

    render() {
        return new DocumentFragment();
    };

    compile(template: string, props: any) {
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                props[key] = child.map((item: any) => `<div data-id="${item.id}"></div>`);
                return;
            }

            props[key] = `<div data-id="${(child as any).id}"></div>`;
        });

        const fragment = document.createElement("template");

        fragment.innerHTML = Handlebars.compile(template)(props);

        Object.values(this.children).forEach((child: any) => {
            if (Array.isArray(child)) {
                child.forEach((item: any) => {
                    const stub = fragment.content.querySelector(`[data-id="${item.id}"]`);

                    if (!stub) {
                        return;
                    }

                    stub.replaceWith(item.getContent());
                });
            }

            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

            if (!stub) {
                return;
            }

            stub.replaceWith(child.getContent());
        });

        return fragment.content;
    };

    _addEvents() {
        const { events = {} } = this.props;

        if (!events) return;

        Object.keys(events).forEach((eventName) => {
            (this._element as any).addEventListener(eventName, events[eventName]);
        });
    };

    _removeEvents() {
        const { events = {} } = this.props;

        if (!events) return;

        Object.keys(events).forEach((eventName) => {
            (this._element as any).removeEventListener(eventName, events[eventName]);
        })
    };

    getContent() {
        return this.element;
    };

    _makePropsProxy(props: any) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    };

    show() {
        (this.getContent() as any).style.display = "block";
    };

    hide() {
        (this.getContent() as any).style.display = "none";
    };
};

export default Block;
