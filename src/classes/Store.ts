import { set } from '../utils/object_utils';
import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Record<string, unknown> = {
        user: null,
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
}
export default new Store();
