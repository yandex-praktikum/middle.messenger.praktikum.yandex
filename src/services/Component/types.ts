import { TValidationResult } from '../Validators/type';

export enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CWU = 'flow:component-will-unmount',
  FLOW_RENDER = 'flow:render',
}

export type ElementEvents = HTMLElementEventMap;

export interface TPropsBase extends Record<string, any> {
  events?: Partial<Record<keyof ElementEvents, (event: ElementEvents[keyof ElementEvents]) => void>>;
  validate?: Record<string, (target: string) => TValidationResult>;
}

export type TBlockElement = HTMLElement | null;
type TChildren<Component> = {
  component: Component;
  embed: (fragment: DocumentFragment) => void;
};
export type TCompileContext<
  TProps = TPropsBase,
  TRefs = Record<string, any>,
  Component = Record<string, any>,
> = TProps & {
  __refs: TRefs;
  __children?: Array<TChildren<Component>>;
};
