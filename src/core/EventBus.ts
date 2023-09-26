export default class EventBus {
  listeners: Map<string, Function[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, curCallback: Function) {
    const { listeners } = this;
    const callbacks = listeners.get(event);

    if (callbacks) {
      callbacks.push(curCallback);
    } else {
      listeners.set(event, [curCallback]);
    }

    return this;
  }

  off(event: string, curCallback: Function) {
    const { listeners } = this;
    const callbacks = listeners.get(event);

    if (!callbacks) {
      throw new Error(`event ${event} not exist`);
    }

    listeners.set(event, callbacks.filter((callback) => curCallback !== callback));

    return this;
  }

  emit(event: string, ...args: number[]) {
    const { listeners } = this;
    const callbacks = listeners.get(event);

    if (!callbacks) {
      throw new Error(`event ${event} not exist`);
    }

    callbacks.forEach((callback) => callback(args));
  }
}
