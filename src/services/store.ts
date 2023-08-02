import { ChatsResponse, UserResponse } from '@models';
import { set } from '@utilities';

import { EventBus } from './eventBus';

export enum StoreEvents {
	STORE_CHANGED = 'store-changed'
}

export interface AppStore {
	user: UserResponse | null;
	chats: ChatsResponse[];
	selectedChatId: number | null;
}

const initialStore: AppStore = {
	user: null,
	chats: [],
	selectedChatId: null
};

class StoreClass extends EventBus {

	private _state: AppStore = initialStore;

	constructor() {
		super();

		this.on(StoreEvents.STORE_CHANGED, () => null);
	}

	getState<T = unknown>(fn: (store: AppStore) => T) {
		return fn(this._state);
	}

	updateState(path: string, value: unknown) {
		set(this._state, path, value);
		this.emit(StoreEvents.STORE_CHANGED);
	}
}

export const Store = new StoreClass();
