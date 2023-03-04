import { set } from '../utils/object_utils';
import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'updated',
}

const initialState: Record<string, unknown> = {
    auth: false,
    user: null,
    getPage: '/',
    chats: [],
    currentChat: {
        scroll: 0,
        chat: null,
        messages: null,
    },
};

class Store extends EventBus {
    private state: Record<string, unknown> = {
        auth: false,
        user: null,
        getPage: '/',
        chats: [],
        currentChat: {
            scroll: 0,
            chat: null,
            messages: null,
        },
    };

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        try {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }

    public setResetState() {
        try {
            this.state = {
                auth: false,
                user: null,
                getPage: '/',
                chats: [],
                currentChat: {
                    scroll: 0,
                    chat: null,
                    messages: null,
                },
            };

            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Store();
