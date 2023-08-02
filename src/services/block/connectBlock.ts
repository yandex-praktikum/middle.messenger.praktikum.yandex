import { isEqual } from '@utilities';

import { AppStore, Store, StoreEvents } from '../store';

import { BaseProps, Block, ChildrenProps } from './block';

export abstract class ConnectBlock<T extends BaseProps = NonNullable<unknown>> extends Block<T> {

	state: unknown;

	protected constructor(public readonly tagName: string,
												public readonly classNames: string,
												propsAndChildren: T | ChildrenProps,
												protected extractFn: (state: AppStore) => unknown) {
		super(tagName, classNames, propsAndChildren);

		this.state = Store.getState(this.extractFn);

		Store.on(StoreEvents.STORE_CHANGED, this.checkStoreUpdates.bind(this));
	}

	checkStoreUpdates() {
		const newState = Store.getState(this.extractFn);

		if (isEqual(this.state, newState)) {
			return;
		}

		this.state = newState;
		this.onStoreUpdated(newState);
	}

	abstract onStoreUpdated(newState: unknown): void;

	componentWillUnmount() {
		Store.off(StoreEvents.STORE_CHANGED, this.checkStoreUpdates.bind(this));
	}
}
