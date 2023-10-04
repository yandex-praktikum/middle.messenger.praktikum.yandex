import { EventBus } from "..";

enum StoreEvents {
  Updated = "Updated",
}

class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();
    this.state = defaultState;
    this.set(defaultState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const previousState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.dispatch(StoreEvents.Updated, previousState, nextState);
  }
}

export { Store, StoreEvents };
