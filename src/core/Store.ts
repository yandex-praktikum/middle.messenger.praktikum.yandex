import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = "updated"
};

type Indexed<T = any> = {
    [key in string]: T;
};

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
};

const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (typeof object !== "object" || object === null) {
        return object;
    }

    if (typeof path !== "string") {
        throw new Error("path must be string");
    }

    const result = path.split(".").reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
};

class Store extends EventBus {
    private _state: Indexed = {};

    public getState() {
        return this._state;
    };

    public setState(path: string, value: unknown) {
        set(this._state, path, value);

        this.emit(StoreEvents.Updated);
    };

    public clearStore(): void {
        this._state = {};
    };
};

export default new Store();
