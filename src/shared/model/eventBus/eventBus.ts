type Subscribers = {
  [key: string]: Function[];
};

interface IEventBus {
  dispatch(event: string, arg: any): void;
  register(event: string, callback: Function): void;
  unregister(event: string, callback: Function): void;
}

export class EventBus implements IEventBus {
  private subscribers: Subscribers;

  constructor() {
    this.subscribers = {};
  }

  dispatch(event: string, ...args: any): void {
    if (this.subscribers[event] === undefined) {
      return;
    }
    this.subscribers[event].forEach((subscriber) => {
      subscriber(...args);
    });
  }

  register(event: string, callback: Function): void {
    if (this.subscribers[event] === undefined) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

  unregister(event: string, callback: Function): void {
    if (this.subscribers[event] === undefined) {
      return;
    }

    this.subscribers[event] = this.subscribers[event].filter(
      (subscriber) => subscriber !== callback
    );
  }
}
