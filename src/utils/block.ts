import EventBus from './event-bus'
import { default as BlockProperties, Properties } from './block-properties'

enum EVENTS {
	INIT = 'init',
	MOUNTED = 'flow:component-did-mount',
	UPDATED = 'flow:component-did-update',
	RENDER = 'flow:render',
	SHOW = 'flow:show'
}

interface BlockInterface {
	init(): void
	bindPropsToElements(bindings: { [propName: string]: string }): void
	componentDidMount(): void
	componentDidUpdate(newProps: BlockProperties): void
	componentDidShow(): void
	render(): void
	setProps(newProps: BlockProperties): void
	show(mode: string): void
	hide(): void
	findChild(selector: string): HTMLElement | null
	findChildren(selector: string): HTMLElement[] | null
	mountTo(parent: string | HTMLElement | Block): void
	clear(): void
}

class Block implements BlockInterface {
	protected template: Element
	protected props: BlockProperties
	protected eventBus: EventBus
	protected propsBindings: { [propName: string]: string } = {}

	protected displayMode: string = ''

	constructor(elementSelector: string, props: Properties = {}, parent?: string | Block | HTMLElement) {
		if (!elementSelector.length) {
			throw new Error('Нет селектора')
		}

		this.props = new BlockProperties(props)

		const eventBus = new EventBus()
		this.eventBus = eventBus

		this._registerEvents()
		this.template = this.loadTemplate(elementSelector)

		eventBus.emit(EVENTS.INIT)

		if (parent) {
			this.mountTo(parent)
		}
	}

	loadTemplate(elementSelector: string): Element {
		const element = document.querySelector(elementSelector)

		if (!element) {
			throw new Error(`Не найден элемент ${elementSelector}`)
		}

		if (!(element instanceof HTMLTemplateElement)) {
			throw new Error(`${elementSelector} должен быть элементом <template>`)
		}

		if (!('content' in element) || !(element.content instanceof DocumentFragment)) {
			throw new Error(`${elementSelector} не является правиильным <template>`)
		}

		const nodeElement = element.content.cloneNode(true) as DocumentFragment
		if (!nodeElement.firstElementChild || !(nodeElement.firstElementChild instanceof Element)) {
			throw new Error('Не найден корневой элемент')
		}

		return nodeElement.firstElementChild!
	}

	protected _registerEvents(): void {
		this.eventBus.on(EVENTS.INIT, this.init.bind(this))
		this.eventBus.on(EVENTS.MOUNTED, this._componentDidMount.bind(this))
		this.eventBus.on(EVENTS.RENDER, this._render.bind(this))
		this.eventBus.on(EVENTS.UPDATED, this._componentDidUpdate.bind(this))
		this.eventBus.on(EVENTS.SHOW, this.componentDidShow.bind(this))
	}

	init(): void {}

	protected _componentDidMount() {
		this.componentDidMount()
		this.eventBus.emit(EVENTS.RENDER)
	}

	componentDidMount(): void {}

	bindPropsToElements(bindings: { [propName: string]: string}): void {
		this.propsBindings = Object.assign({}, bindings)
		this.eventBus.emit(EVENTS.RENDER)
	}

	protected _applyProps(): void {
		for (const propName in this.propsBindings) {
			const propValue = this.props.getProperty(propName)
			const componentElement = this.findChild(this.propsBindings[propName])
			if (componentElement && propValue !== null) {
				componentElement.textContent = propValue
			}
		}
	}

	protected _render() {
		this._applyProps()
		this.render()
	}

	render(): void {}

	protected _componentDidUpdate(newProps: Properties): void {
		const newPropsObject = new BlockProperties(newProps)
		this.componentDidUpdate(newPropsObject)

		const newPropNames = newPropsObject.getAllPropertyNames()
		for (let propName of newPropNames) {
			this.props.setProperty(propName, newPropsObject.getProperty(propName))
		}

		this.eventBus.emit(EVENTS.RENDER)
	}

	componentDidUpdate(newProps: BlockProperties): void {}

	setProps(newProps?: Properties): void | null {
		if (newProps && !this.props.equalTo(newProps)) {
			this.eventBus.emit(EVENTS.UPDATED, Object.assign({}, newProps))
		}
	}

	get element(): HTMLElement {
		return this.template as HTMLElement
	}

	show(mode?: string): void {
		const newMode = mode || this.displayMode || 'block'
		this.element.style.display = newMode
		this.eventBus.emit(EVENTS.SHOW)
	}

	componentDidShow(): void { }

	hide(): void {
		this.displayMode = getComputedStyle(this.element).display
		this.element.style.display = 'none'
	}

	findChild(selector: string): HTMLElement | null {
		const child = this.template.querySelector(selector)
		if (!child) {
			return null
		}
		return child as HTMLElement
	}

	findChildren(selector: string): HTMLElement[] | null {
		const children = this.template.querySelectorAll(selector)
		if (!children || !children.length) {
			return null
		}
		return Array.from(children) as HTMLElement[]
	}

	mountTo(parent: string | Block | HTMLElement): void {
		let parentNode: HTMLElement

		if (typeof parent === 'string') {
			const node = document.querySelector(parent) as HTMLElement
			if (!node) {
				throw new Error(`Не найден родительский элемент ${parent}`)
			}
			parentNode = node
		}
		else if (parent instanceof Block) {
			parentNode = parent.element
		}
		else {
			parentNode = parent
		}
		parentNode.appendChild(this.template)
		this.eventBus.emit(EVENTS.MOUNTED)
	}

	clear(): void {
		this.element.innerHTML = ''
	}
}

export { Block as default }