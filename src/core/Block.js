/* eslint-disable */

import EventBus from "./EventBus";
import { v4 as uuid } from "uuid";

export default class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element = null;
	_meta = null;
  _id = null;

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
		  this.props = this._makePropsProxy({...props, __id: this._id});
    } else {
      this.props = this._makePropsProxy(props);
    }

		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

  _unregisterEvents(eventBus) {
    eventBus.off(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.off(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

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
    console.log('init');
		this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

  _createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

  _createDocumentElement(tagName) {
		const element = document.createElement(tagName);
    if (this._id) {
      element.dataset.id = this._id;
    }

		return element;
	}

	_componentDidMount() {
    console.log('_componentDidMount');
    this.componentDidMount();
    // this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
	componentDidMount(oldProps) {
    console.log('componentDidMount');

    dispatchComponentDidMoun();
  }

	dispatchComponentDidMoun() {
    console.log('dispatchComponentDidMoun');
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

	_componentDidUpdate(oldProps, newProps) {
    console.log('_componentDidUpdate');
    const response = this.componentDidUpdate(oldProps, newProps);
  }

  // Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps, newProps) {
    console.log('componentDidUpdate');
    console.log(oldProps);
    console.log(newProps);
    // this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		// return true;


    if (true) {
      return true;
    }

    return false;
	}

	setProps = newProps => {
    console.log('setProps');
		if (!newProps) {
			return;
		}

    // this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, newProps);
		// Object.assign(this.props, newProps);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDU);
	};

	get element() {
		return this._element;
	}

	_render() {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
	render() {
    console.log('render');
  }

  compile(template, props) {
    const propsAndStubs = {...props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    })

    console.log(propsAndStubs);

    return template(propsAndStubs);
  }

  _addEvents() {
    const {events = new Map()} = this.props;

    events.forEach((eventFun, eventName) => {
      this._element.addEventListener(eventName, eventFun);
    })
  }

  _removeEvents() {
    const {events = new Map()} = this.props;

    events.forEach((eventFun, eventName) => {
      this._element.removeEventListener(eventName, eventFun);
    })
  }

	getContent() {
		return this.element;
	}

	_makePropsProxy(props) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;
    const proxyProps = new Proxy(props, {
      set(target, prop, newValue) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Permission denied');
        }

        target[prop] = newValue;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU);

        return true;
      },
      deleteProperty() {
        throw new Error('Permission denied');
      },
    })

		return proxyProps;
	}

	show() {}

	hide() {}
}
