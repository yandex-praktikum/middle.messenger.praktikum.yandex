export type TEventBusEvent = string;

// eslint-disable-next-line no-unused-vars
export type TListner<T extends unknown[] = any[]> = (...args: T) => void;
export type TListners<T extends unknown[] = any[]> = TListner<T>[];
export type TEventBusListners<T extends unknown[] = any[]> = Record<TEventBusEvent, TListners<T>>;

// eslint-disable-next-line no-unused-vars
export type TOnFn = (event: TEventBusEvent, callback: TListner) => void;
// eslint-disable-next-line no-unused-vars
export type TOffFn = (event: TEventBusEvent, callback: TListner) => void;
// eslint-disable-next-line no-unused-vars
export type TEmitFn<T extends unknown[] = any[]> = (event: TEventBusEvent, ...args: T) => void;

export interface IEventBus {
  listeners: TEventBusListners;
  on: TOnFn;
  off: TOffFn;
  emit: TEmitFn;
}
