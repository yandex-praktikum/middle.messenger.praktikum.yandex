type FnType = (...args: any[]) => void;

export class EventBus {

  private readonly listeners: Record<string, Array<FnType>> = {};

  on(event: string, callback: FnType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw Error(`Событие ${event} не найдено!`);
    }

    this.listeners[event].forEach(listener => listener(...args));
  }

  off(event: string, callback: FnType) {
    if (!this.listeners[event]) {
      throw Error(`Событие ${event} не найдено!`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => {
				return (listener !== callback) && (listener.toString() !== callback.toString());
			}
    );
  }
}
