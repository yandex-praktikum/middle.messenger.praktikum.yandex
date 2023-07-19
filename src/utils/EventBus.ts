type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>,
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[];
  } = {};

  on<Event extends MapInterface<E>>(
    event: Event,
    callback: Handler<Args[Event]>
  ) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(
    event: Event,
    callback: Handler<Args[Event]>
  ) {
    if (!this.listeners[event]) throw new Error(`${event} doesn't exist`);
    this.listeners[event] = this.listeners[event]!.filter(
      (l) => l !== callback
    );
  }

  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach((l) => l(...args));
  }
}
