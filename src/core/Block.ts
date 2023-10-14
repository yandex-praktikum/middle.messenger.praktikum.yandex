/* eslint-disable no-param-reassign, no-underscore-dangle */

// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import isEqual from '../utils/isEqual';

type EventsEnum = {
    [key in Uppercase<string>]: Lowercase<string>;
};

export type TEvent = (e:Event)=>void;
type Events = {
    [key: string | symbol]:TEvent;
};
type Parent = Block | undefined;
export type Props = {
    events?: Events,
    parent?: Parent,
    [key: string | symbol]: any,
};

type Children = Block[] | Element[];
export type Ref = Record<string | symbol, Block>;

export type BlockType = {
    new(propsAndParent: Props): Block
};

// Нельзя создавать экземпляр данного класса
abstract class Block {
    static EVENTS: EventsEnum = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: 'flow:render',
    };

    public id: string = nanoid(6);

    // Сройства компонента. Будут переданы в шаблон во время ренденгинга
    protected props: Props;

    // Ссылки на элементы внутри поддерева
    protected refs: Ref = {};

    protected parent: Parent;

    protected events: Events = {};

    // Храним для удаления
    public children: Children = [];

    // События, которые будут автоматически подключены к указанным refs или this.element()
    // При передаче { event: callback } подключается к this.element()
    // При передаче { ref: {event: callback} } подключается к указанному ref
    protected readonly eventBus: () => EventBus;

    // Элемент в DOM в который отрендерим этот компонент
    private _element: HTMLElement | null = null;

    protected constructor(propsAndParent: Props) {
        const { events, parent, ...props } = propsAndParent;

        this.parent = parent;
        this.events = events || {};
        this.props = this._makePropsProxy(props as Props);

        const eventBus: EventBus = new EventBus();
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        Object.keys(this.events)
            .forEach((eventName) => {
                this._element?.addEventListener(eventName, this.events[eventName]);
            });
        this.addEvents();
    }

    addEvents() {
    }

    // Not used anywhere yet
    // @ts-ignore
    private _removeEvents() {
        Object.keys(this.events)
            .forEach((eventName) => {
                this._element?.removeEventListener(eventName, this.events[eventName]);
            });
        this.removeEvents();
    }

    removeEvents() {
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
        return this;
    }

    private _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        this.children.forEach((child) => {
            if (child instanceof Block) child.dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            this.afterComponentUpdate();
        }
    }

    protected afterComponentUpdate() {}

    protected componentDidUpdate(oldProps: Props, newProps: Props) {
        return !isEqual(oldProps, newProps);
    }

    protected _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    protected _componentWillUnmount() {
        this.componentWillUnmount();
    }

    public componentWillUnmount() {}

    public setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    public get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.compile(this.render(), this.props);

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    private compile(template: string, context: Props) {
        const contextAndStubs = {
            ...context, __refs: this.refs, __parent: this, __children: this.children, __embeds: [],
        };

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        contextAndStubs.__embeds
            ?.forEach((fn: (fragment: DocumentFragment)=>void) => fn(temp.content));

        return temp.content;
    }

    protected render(): string {
        return '';
    }

    getContent() {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this.element;
    }

    _makePropsProxy(props: Props): Props {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value):boolean {
                const oldTarget = { ...target };

                target[prop as keyof Props] = value;

                // Запускаем обновление компоненты. Плохой cloneDeep,
                // в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus()
                    .emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    /*
    private _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
     */

    show() {
        this.getContent()!.style.removeProperty('display'); // .display = 'block';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}

export default Block;
