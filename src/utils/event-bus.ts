export { EventBus as default }

class EventBus {
	protected listeners: {
		[listenerName: string]: CallableFunction[]
	}

	constructor() {
		this.listeners = {}
	}

	on(event: string, callback: CallableFunction) {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}

		this.listeners[event].push(callback)
	}

	off(event: string, callback: CallableFunction) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`)
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		)
	}

	emit(event: string, ...args: any) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`)
		}

		this.listeners[event].forEach(listener => {
			listener(...args)
		})
	}
}